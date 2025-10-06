# Awsam.online - Setup Guide

## Getting Started

Awsam.online is a smart link-in-bio storefront platform built for small businesses selling through WhatsApp, TikTok, and Instagram.

## Prerequisites

- Node.js 18+ installed
- A Clerk account for authentication
- A Supabase account for database

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Configure Clerk Authentication

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Copy your Publishable Key and Secret Key
4. Update `.env` file with your Clerk keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
```

### 3. Configure Supabase Database

Your Supabase database is already configured. The database schema includes:

- **users** - User accounts linked to Clerk
- **stores** - Store information (username, name, bio, WhatsApp number, etc.)
- **products** - Product listings (name, price, description, images)

All necessary tables have been created with proper Row Level Security (RLS) policies.

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Features Implemented

### Authentication & Onboarding
- Clerk-based authentication (email/password)
- User onboarding flow with username selection
- Protected dashboard routes

### Dashboard
- Overview page with store statistics
- Products management (add, edit, delete)
- Settings page for store configuration
- Store link generation

### Public Storefront
- Dynamic storefront at `/store/[username]`
- Product grid display
- WhatsApp order integration
- Product detail pages

### API Routes
- `/api/onboarding` - Create user and store
- `/api/store` - Get and update store settings
- `/api/products` - CRUD operations for products

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Clerk
- **UI**: Tailwind CSS + shadcn/ui
- **Styling**: Modern, minimal design
- **Deployment**: Ready for Vercel

## Next Steps

1. **Add Clerk API Keys** to `.env` file (required for build)
2. **Test the complete flow**:
   - Sign up → Onboarding → Add products → View storefront
3. **Optional enhancements**:
   - Image upload integration (UploadThing or Cloudinary)
   - Analytics tracking
   - Payment integration
   - Custom domains

## Important Notes

- **Free Plan**: Limited to 3 products per store
- **WhatsApp Integration**: Uses WhatsApp deep links (wa.me)
- **Public Access**: Storefronts are publicly accessible without login
- **Security**: All data operations use RLS policies for security

## Support

For questions or issues, please refer to the documentation or contact support.
