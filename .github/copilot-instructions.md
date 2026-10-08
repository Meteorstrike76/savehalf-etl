# Repository Guidelines

## Project
SaveHalf ETL is a small Python pipeline that downloads a grocery catalogue PDF, extracts text with `pdfplumber`, asks Gemini to identify specials, and writes the results to a Supabase `products` table.

## Running
The GitHub Actions workflow uses Python 3.11 and runs `python scraper.py`. It installs `requests`, `pdfplumber`, `google-genai`, `supabase`, and `beautifulsoup4` inline. Required environment variables are `SUPABASE_URL`, `SUPABASE_KEY`, and `GEMINI_API_KEY`. Never commit credentials.

## Code Changes
- Keep changes focused on the existing scraper and scheduled/manual workflow unless the task calls for broader restructuring.
- Preserve compatibility with Python 3.11 and the workflow's dependency setup.
- The catalogue URL is currently a dummy PDF; don't assume it is a production retailer feed.
- `update_database()` deletes existing product rows before inserting parsed deals. Treat changes to this behavior as data-loss-sensitive and make the replacement scope explicit.
- Gemini is expected to return JSON matching the product fields used by the Supabase table; validate external inputs and failures when changing this boundary.

## Validation
There is no configured test suite or dependency manifest at present. For Python changes, run `python -m py_compile scraper.py` as a lightweight syntax check. Do not run the full pipeline as validation unless credentials and the external side effects are intentionally available.
