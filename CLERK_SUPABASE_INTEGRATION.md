# Clerk + Supabase JWT Integration Guide

## Overview

This application uses Clerk for authentication and Supabase for the database. The integration uses Clerk's JWT tokens to authenticate users with Supabase's Row Level Security (RLS) policies.

## Current Implementation

The app currently uses a **server-side approach** where:

1. Clerk handles authentication in the frontend
2. API routes validate the user's session using `auth()` from `@clerk/nextjs/server`
3. Database queries use the Supabase client with the anon key
4. RLS policies check the JWT token's `sub` claim (Clerk User ID)

## RLS Policy Pattern

All RLS policies use this pattern to check user identity:

```sql
-- Example: Check if the authenticated user owns the store
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = user_id
    AND users.clerk_id = auth.jwt()->>'sub'
  )
)
```

The `auth.jwt()->>'sub'` extracts the Clerk User ID from the JWT token.

## How to Enable Direct Client-Side Supabase Auth

If you want to use Supabase directly from the client (not through API routes), you need to configure Clerk to issue Supabase-compatible JWTs:

### Step 1: Configure Clerk JWT Template

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Navigate to **JWT Templates**
3. Create a new template named "supabase"
4. Add these claims:

```json
{
  "aud": "authenticated",
  "sub": "{{user.id}}",
  "email": "{{user.primary_email_address}}",
  "role": "authenticated"
}
```

5. Save the template

### Step 2: Update Supabase Client

Create a new client that uses Clerk's JWT:

```typescript
// lib/supabase-client.ts
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '@clerk/nextjs';

export function useSupabaseClient() {
  const { getToken } = useAuth();

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: async () => {
          const token = await getToken({ template: 'supabase' });
          return {
            Authorization: `Bearer ${token}`,
          };
        },
      },
    }
  );
}
```

### Step 3: Update RLS Policies

The RLS policies are already configured to work with JWT tokens. The `auth.jwt()->>'sub'` will automatically extract the Clerk User ID from the token.

## Current Architecture (Recommended)

The current implementation uses **API Routes** as the middle layer, which is recommended because:

### Advantages:
- **Security**: Keeps database logic on the server
- **Flexibility**: Easy to add business logic, validation, and authorization
- **Rate Limiting**: Can implement rate limiting at the API level
- **Error Handling**: Centralized error handling
- **Abstraction**: Frontend doesn't need to know database structure

### API Route Pattern:

```typescript
import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  // Query Supabase using service role or anon key
  const { data } = await supabase
    .from("stores")
    .select("*")
    .eq("clerk_id", userId);

  return NextResponse.json(data);
}
```

## Database Schema

All tables are linked to the `users` table, which stores the Clerk User ID:

```
users (clerk_id) → stores (user_id) → products (store_id)
```

This allows RLS policies to check ownership by joining through the users table.

## Security Notes

1. **Never expose service role key** - Only use in API routes
2. **Always validate user identity** - Check `userId` from Clerk before database operations
3. **Use RLS policies** - Even with API routes, RLS provides an extra security layer
4. **Validate input** - Always validate and sanitize user input in API routes

## Testing RLS Policies

You can test RLS policies by querying Supabase with different JWT tokens:

```sql
-- Set the JWT token (for testing)
SELECT set_config('request.jwt.claims', '{"sub": "user_clerk_id"}', true);

-- Try to access data
SELECT * FROM stores;
```

## Common Issues

### Issue: RLS policies blocking legitimate queries
**Solution**: Check that the JWT token includes the correct `sub` claim with the Clerk User ID

### Issue: Cannot access data in dashboard
**Solution**: Verify that the user record exists in the `users` table with the correct `clerk_id`

### Issue: Public storefront not accessible
**Solution**: Ensure the stores and products tables have public read policies (`USING (true)`)

## Summary

The current implementation strikes a good balance between security and functionality. The API routes handle all database operations, and RLS policies provide an additional security layer. This architecture is production-ready and scalable.
