/*
  # Create Awsam.online Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - Unique identifier for the user
      - `clerk_id` (text, unique) - Clerk authentication ID
      - `email` (text, unique) - User's email address
      - `created_at` (timestamptz) - Account creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
    
    - `stores`
      - `id` (uuid, primary key) - Unique identifier for the store
      - `user_id` (uuid, unique, foreign key) - Reference to users table
      - `username` (text, unique) - Unique store username for public URL
      - `name` (text) - Store display name
      - `bio` (text) - Store description/bio
      - `logo_url` (text) - URL to store logo image
      - `whatsapp_number` (text) - WhatsApp number for orders
      - `plan` (text) - Subscription plan (FREE or PRO)
      - `created_at` (timestamptz) - Store creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
    
    - `products`
      - `id` (uuid, primary key) - Unique identifier for the product
      - `store_id` (uuid, foreign key) - Reference to stores table
      - `name` (text) - Product name
      - `price_cents` (integer) - Price in cents
      - `description` (text) - Product description
      - `image_url` (text) - URL to product image
      - `created_at` (timestamptz) - Product creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public read access to stores and products
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.jwt()->>'sub' = clerk_id);

-- Users can insert their own data
CREATE POLICY "Users can insert own data"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt()->>'sub' = clerk_id);

-- Users can update their own data
CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.jwt()->>'sub' = clerk_id)
  WITH CHECK (auth.jwt()->>'sub' = clerk_id);

-- Create stores table
CREATE TABLE IF NOT EXISTS stores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  name text NOT NULL,
  bio text DEFAULT '',
  logo_url text,
  whatsapp_number text,
  plan text DEFAULT 'FREE',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE stores ENABLE ROW LEVEL SECURITY;

-- Anyone can read stores (public access)
CREATE POLICY "Anyone can read stores"
  ON stores FOR SELECT
  TO public
  USING (true);

-- Store owners can insert their store
CREATE POLICY "Users can insert own store"
  ON stores FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = user_id
      AND users.clerk_id = auth.jwt()->>'sub'
    )
  );

-- Store owners can update their store
CREATE POLICY "Users can update own store"
  ON stores FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = user_id
      AND users.clerk_id = auth.jwt()->>'sub'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = user_id
      AND users.clerk_id = auth.jwt()->>'sub'
    )
  );

-- Store owners can delete their store
CREATE POLICY "Users can delete own store"
  ON stores FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = user_id
      AND users.clerk_id = auth.jwt()->>'sub'
    )
  );

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  name text NOT NULL,
  price_cents integer NOT NULL DEFAULT 0,
  description text DEFAULT '',
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Anyone can read products (public access)
CREATE POLICY "Anyone can read products"
  ON products FOR SELECT
  TO public
  USING (true);

-- Store owners can insert products
CREATE POLICY "Store owners can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM stores
      JOIN users ON stores.user_id = users.id
      WHERE stores.id = store_id
      AND users.clerk_id = auth.jwt()->>'sub'
    )
  );

-- Store owners can update their products
CREATE POLICY "Store owners can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stores
      JOIN users ON stores.user_id = users.id
      WHERE stores.id = store_id
      AND users.clerk_id = auth.jwt()->>'sub'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM stores
      JOIN users ON stores.user_id = users.id
      WHERE stores.id = store_id
      AND users.clerk_id = auth.jwt()->>'sub'
    )
  );

-- Store owners can delete their products
CREATE POLICY "Store owners can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stores
      JOIN users ON stores.user_id = users.id
      WHERE stores.id = store_id
      AND users.clerk_id = auth.jwt()->>'sub'
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id);
CREATE INDEX IF NOT EXISTS idx_stores_user_id ON stores(user_id);
CREATE INDEX IF NOT EXISTS idx_stores_username ON stores(username);
CREATE INDEX IF NOT EXISTS idx_products_store_id ON products(store_id);