import { createClient } from '@supabase/supabase-js';

// Vite uses import.meta.env and requires the VITE_ prefix
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables. Check your .env.local file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export type StoreCategory = 'Coles' | 'Woolworths' | 'Aldi' | 'Big W' | 'Kmart' | 'OzBargain';
export type DealCategory = 'Groceries' | 'Electronics' | 'Home & Living' | 'Fashion' | 'Clearance';
type SourceFeed = 'direct' | 'ozbargain';

interface DealRow {
  id: string;
  title: string;
  deal_url: string;
  category: DealCategory;
  store_category: StoreCategory;
  discount_price: number | string;
  original_price: number | string;
  image_url: string;
  published_at: string | null;
  source_feed: SourceFeed;
  upvotes: number;
  coupon_code: string | null;
}

export interface Deal {
  id: string;
  title: string;
  dealUrl: string;
  category: DealCategory;
  storeCategory: StoreCategory;
  discountPrice: number;
  originalPrice: number;
  imageUrl: string;
  publishedAt: string | null;
  sourceFeed: SourceFeed;
  upvotes: number;
  couponCode: string | null;
}

export function normalizeDeal(row: DealRow): Deal {
  return {
    id: row.id,
    title: row.title,
    dealUrl: row.deal_url,
    category: row.category,
    storeCategory: row.store_category,
    discountPrice: Number(row.discount_price),
    originalPrice: Number(row.original_price),
    imageUrl: row.image_url,
    publishedAt: row.published_at,
    sourceFeed: row.source_feed,
    upvotes: row.upvotes,
    couponCode: row.coupon_code,
  };
}

interface SavedDealRow {
  id: string;
  user_id: string;
  deal_id: string;
  created_at: string;
  deal: DealRow | null;
}

export interface SavedDeal {
  id: string;
  user_id: string;
  deal_id: string;
  created_at: string;
  deal: Deal;
}

export function normalizeSavedDeal(row: SavedDealRow): SavedDeal | null {
  if (!row.deal) return null;

  return {
    id: row.id,
    user_id: row.user_id,
    deal_id: row.deal_id,
    created_at: row.created_at,
    deal: normalizeDeal(row.deal),
  };
}