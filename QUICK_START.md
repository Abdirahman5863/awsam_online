# Quick Start Guide

## Get Awsam.online Running in 5 Minutes

⚠️ **Important**: This project requires valid Clerk API keys to build. See [BUILD_NOTES.md](./BUILD_NOTES.md) for details.

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Clerk Authentication

1. Visit [https://dashboard.clerk.com/](https://dashboard.clerk.com/)
2. Create a new application
3. Select **Email/Password** authentication
4. Copy your API keys

### Step 3: Configure Environment Variables

Open `.env` and update with your Clerk keys:

```env
# Clerk Authentication (REQUIRED)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxx

# These are already configured
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

### Step 4: Configure Clerk Redirects

In your Clerk Dashboard:

1. Go to **Paths** in the sidebar
2. Set these paths:
   - Sign-in URL: `/login`
   - Sign-up URL: `/signup`
   - After sign-in: `/dashboard`
   - After sign-up: `/onboarding`

### Step 5: Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

**Note**: Development mode works without real Clerk keys (for UI testing). Authentication requires valid keys.

### Step 6: Build for Production (Optional)
```bash
npm run build
```

⚠️ **Build requires valid Clerk keys**. See [BUILD_NOTES.md](./BUILD_NOTES.md) if build fails.

## Test the Complete Flow

### 1. Sign Up as New User
- Click "Get Started Free"
- Create account with email/password
- You'll be redirected to onboarding

### 2. Create Your Store
- Enter a Store Name: "My Awesome Store"
- Choose a Username: "mystore"
- Click "Create My Store"
- You'll be redirected to dashboard

### 3. Add Products
- Click "Add Product"
- Fill in product details
- Upload image (or use URL)
- Save product

### 4. View Your Storefront
- Click "View Store" in dashboard header
- Or visit: `localhost:3000/store/mystore`
- Test WhatsApp order button

### 5. Edit Store Settings
- Go to Settings in dashboard
- Update store name, bio, WhatsApp number
- Add logo
- Save changes

## Key Features

### For Sellers
- ✅ Simple store creation with unique username
- ✅ Product management with images
- ✅ WhatsApp order integration
- ✅ Clean dashboard interface
- ✅ Store customization options

### For Buyers
- ✅ Beautiful product catalog
- ✅ One-click WhatsApp ordering
- ✅ Mobile-responsive design
- ✅ Fast loading times

## Architecture Overview

```
Frontend (Next.js)
├── Landing Page (/)
├── Auth Pages (/login, /signup)
├── Onboarding (/onboarding)
├── Dashboard (/dashboard/*)
│   ├── Products Management
│   └── Settings
└── Public Storefront (/store/[username])

Backend (API Routes)
├── /api/onboarding - Create user & store
├── /api/store - Store CRUD
└── /api/products - Product CRUD

Database (Supabase)
├── users - Linked to Clerk
├── stores - One per user
└── products - Multiple per store

Authentication (Clerk)
├── JWT tokens
├── Session management
└── User profiles
```

## Common Issues & Solutions

### Build Error: Invalid Clerk Keys
**Problem**: `The publishableKey passed to Clerk is invalid`
**Solution**: Add your real Clerk API keys to `.env`

### Can't Access Dashboard
**Problem**: Redirects to onboarding even after creating store
**Solution**:
1. Check browser console for errors
2. Verify API calls in Network tab
3. Check database for user/store records

### Onboarding Keeps Showing
**Problem**: Store creation not working
**Solution**:
1. Check API logs in terminal
2. Verify Supabase connection
3. Check if username already exists

### WhatsApp Button Not Working
**Problem**: Button doesn't open WhatsApp
**Solution**: Add your WhatsApp number in Settings (format: country code + number, no spaces)

## Project Structure

```
awsam-online/
├── app/
│   ├── api/              # Backend API routes
│   ├── dashboard/        # Protected dashboard
│   ├── onboarding/       # Store creation
│   └── store/            # Public storefronts
├── components/
│   ├── auth/             # Auth components
│   ├── dashboard/        # Dashboard UI
│   ├── storefront/       # Public UI
│   └── ui/               # Reusable UI
├── lib/
│   └── supabase.ts       # DB client
└── public/               # Static assets
```

## Environment Variables

Required:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - From Clerk
- `CLERK_SECRET_KEY` - From Clerk

Already Configured:
- `NEXT_PUBLIC_SUPABASE_URL` - Database URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Database key
- Clerk redirect URLs

## Deployment (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

Your app will be live at: `your-project.vercel.app`

## Need Help?

- Check `SETUP.md` for detailed setup
- Check `AUTHENTICATION_FLOW.md` for auth details
- Check `CLERK_SUPABASE_INTEGRATION.md` for database info
- Check `README.md` for complete documentation

## Next Steps

1. ✅ Add Clerk API keys
2. ✅ Test complete user flow
3. 🔲 Add custom domain
4. 🔲 Configure image upload
5. 🔲 Add analytics
6. 🔲 Launch to production!
