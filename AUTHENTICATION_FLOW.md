# Authentication & Store Creation Flow

## Overview

Awsam.online now has a complete authentication flow that ensures users create a store before accessing the dashboard.

## User Flow

### 1. New User Registration
```
User visits → Clicks "Get Started" → Sign Up Page (Clerk)
↓
User creates account with email/password
↓
Clerk redirects to /onboarding
```

### 2. Store Creation (Onboarding)
```
User lands on /onboarding
↓
Enters Store Name and Username
↓
API creates:
  - User record in database (linked to Clerk ID)
  - Store record with chosen username
↓
Redirects to /dashboard
```

### 3. Returning User Login
```
User visits → Clicks "Sign In" → Login Page (Clerk)
↓
User enters credentials
↓
Clerk authenticates
↓
StoreCheck component runs:
  - Checks if user has a store
  - If YES → Loads dashboard
  - If NO → Redirects to /onboarding
```

## Protected Routes

### Dashboard Routes (Require Auth + Store)
- `/dashboard` - Main dashboard
- `/dashboard/products` - Product management
- `/dashboard/settings` - Store settings

These routes are protected by:
1. **Clerk Middleware** - Ensures user is authenticated
2. **StoreCheck Component** - Ensures user has a store

### Public Routes (No Auth Required)
- `/` - Landing page
- `/store/[username]` - Public storefront
- `/store/[username]/product/[productId]` - Product detail

### Auth Routes (Authenticated users redirected)
- `/login` - Clerk Sign In
- `/signup` - Clerk Sign Up
- `/onboarding` - Store creation (redirects to dashboard if store exists)

## Components

### StoreCheck Component
Location: `components/auth/store-check.tsx`

**Purpose**: Ensures authenticated users have a store before accessing dashboard

**Behavior**:
- Fetches user's store from API
- Shows loading spinner while checking
- Redirects to `/onboarding` if no store found
- Renders children if store exists

**Usage**:
```tsx
<StoreCheck>
  <DashboardContent />
</StoreCheck>
```

### Onboarding Page
Location: `app/onboarding/page.tsx`

**Purpose**: Collect store information from new users

**Features**:
- Checks if user already has a store (redirects to dashboard if yes)
- Username validation (lowercase, alphanumeric, hyphens only)
- Real-time username formatting
- Error handling for duplicate usernames
- Creates user and store records via API

## API Endpoints

### POST /api/onboarding
**Purpose**: Create user and store records

**Request Body**:
```json
{
  "clerkId": "user_xxx",
  "email": "user@example.com",
  "username": "mystore",
  "storeName": "My Awesome Store"
}
```

**Response**:
- Success (201): Returns user and store objects
- Error (400): Invalid data or duplicate username
- Error (401): Unauthorized

**Validation**:
- Username must be lowercase alphanumeric with hyphens
- Username must be unique
- All fields are required

### GET /api/store
**Purpose**: Fetch user's store information

**Response**:
- Success (200): Returns store object or null
- Error (401): Unauthorized

## Middleware

Location: `middleware.ts`

**Public Routes**:
- Landing page: `/`
- Storefronts: `/store/*`
- Auth pages: `/login`, `/signup`
- Onboarding: `/onboarding`

**Protected Routes**:
- Everything else requires authentication via Clerk

**Note**: Store checking happens in the StoreCheck component, not middleware, for better UX and error handling.

## Security

### Authentication
- Clerk handles all authentication
- JWT tokens issued by Clerk
- Secure session management

### Database Access
- All API routes validate Clerk session
- Row Level Security (RLS) policies on all tables
- Users can only access their own data

### Store Creation
- One store per user enforced by database constraints
- Username uniqueness enforced at database level
- Clerk ID linked to user record for verification

## Testing the Flow

### Test New User Flow
1. Clear browser cookies
2. Visit landing page
3. Click "Get Started Free"
4. Sign up with email/password
5. Should redirect to onboarding
6. Enter store details
7. Should redirect to dashboard
8. Try to visit `/onboarding` → Should redirect to dashboard

### Test Returning User
1. Log out from dashboard
2. Click "Sign In"
3. Enter credentials
4. Should load dashboard directly (no onboarding)

### Test User Without Store
1. Manually delete user's store from database
2. Try to access dashboard
3. Should redirect to onboarding

## Common Issues

### Issue: User stuck on onboarding
**Cause**: Store creation API failing
**Solution**: Check API logs, verify database connection

### Issue: User can access dashboard without store
**Cause**: StoreCheck component not wrapping dashboard
**Solution**: Verify dashboard layout includes StoreCheck

### Issue: Onboarding not redirecting to dashboard
**Cause**: API route not returning success
**Solution**: Check API response and error handling

## Development Notes

- The StoreCheck component runs on every dashboard page load
- API calls are cached by the browser for performance
- Loading states prevent flash of incorrect content
- Error boundaries should be added for production

## Future Enhancements

- [ ] Add email verification requirement
- [ ] Add store setup wizard with steps
- [ ] Allow store deletion and recreation
- [ ] Add admin panel to view all stores
- [ ] Implement rate limiting on store creation
