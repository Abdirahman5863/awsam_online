import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type User = {
  id: string;
  clerk_id: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export type Store = {
  id: string;
  user_id: string;
  username: string;
  name: string;
  bio?: string;
  logo_url?: string;
  whatsapp_number?: string;
  plan: 'FREE' | 'PRO';
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: string;
  store_id: string;
  name: string;
  price_cents: number;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
};
