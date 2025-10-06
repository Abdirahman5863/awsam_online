import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { clerkId, email, username, storeName } = body;

    if (!clerkId || !email || !username || !storeName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (clerkId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const usernameRegex = /^[a-z0-9-]+$/;
    if (!usernameRegex.test(username)) {
      return NextResponse.json(
        { error: "Username can only contain lowercase letters, numbers, and hyphens" },
        { status: 400 }
      );
    }

    const { data: existingUsername } = await supabase
      .from("stores")
      .select("username")
      .eq("username", username)
      .maybeSingle();

    if (existingUsername) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 });
    }

    const { data: user, error: userError } = await supabase
      .from("users")
      .insert({ clerk_id: clerkId, email })
      .select()
      .single();

    if (userError) {
      console.error("User creation error:", userError);
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }

    const { data: store, error: storeError } = await supabase
      .from("stores")
      .insert({
        user_id: user.id,
        username,
        name: storeName,
        plan: "FREE",
      })
      .select()
      .single();

    if (storeError) {
      console.error("Store creation error:", storeError);
      return NextResponse.json({ error: "Failed to create store" }, { status: 500 });
    }

    return NextResponse.json({ user, store }, { status: 201 });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
