import os
import json
import requests
import pdfplumber
from google.genai import Client, types
from supabase import create_client

# 1. Connect to your secure credentials
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")
supabase = create_client(supabase_url, supabase_key)

# Gemini automatically uses the GEMINI_API_KEY environment variable
ai_client = Client()

def download_catalogue():
    # For the prototype, we use a sample PDF URL. 
    # In a real scenario, this points to the Coles/Woolies weekly catalogue URL.
    url = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    response = requests.get(url)
    with open("catalogue.pdf", "wb") as f:
        f.write(response.content)

def extract_text_from_pdf():
    text = ""
    with pdfplumber.open("catalogue.pdf") as pdf:
        for page in pdf.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
    return text

def parse_specials_with_gemini(text):
    prompt = f"""
    Extract all grocery items from this text. We are looking for half-price or clearance specials.
    Return a JSON list of objects. Each object must have these exact keys:
    - product_name (string)
    - store_name (string, use 'Coles' as default)
    - original_price (number)
    - sale_price (number)
    - category (string, e.g., 'Pantry', 'Household')
    - image_url (string, use 'https://dummyimage.com/400x400/e02424/ffffff&text=Special' as placeholder)
    
    Raw Text:
    {text[:15000]} 
    """
    
    # We use response_mime_type to force Gemini to output clean JSON
    response = ai_client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
        ),
    )
    return json.loads(response.text)

def update_database(deals):
    # Wipe old deals (requires a filter, so we say 'id is not 0')
    supabase.table("products").delete().neq("id", 0).execute()
    
    # Insert new deals if Gemini found any
    if deals:
        supabase.table("products").insert(deals).execute()
        print(f"Successfully inserted {len(deals)} deals!")

if __name__ == "__main__":
    print("Downloading catalogue...")
    download_catalogue()
    
    print("Extracting text...")
    pdf_text = extract_text_from_pdf()
    
    print("Parsing with Gemini...")
    deals_data = parse_specials_with_gemini(pdf_text)
    
    print("Updating Supabase...")
    update_database(deals_data)
    
    print("Pipeline Complete!")