import { auth } from "@clerk/nextjs/server"
import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("clerk_id", userId)
    .maybeSingle();

  if (!user) {
    return NextResponse.json(null);
  }

  const { data: store } = await supabase
    .from("stores")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  return NextResponse.json(store);
}

export async function PUT(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const data = await req.json();

  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("clerk_id", userId)
    .maybeSingle();

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  const { data: existingStore } = await supabase
    .from("stores")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  let store;

  if (existingStore) {
    const { data: updated } = await supabase
      .from("stores")
      .update({
        name: data.name,
        username: data.username,
        bio: data.bio || null,
        logo_url: data.logoUrl || null,
        whatsapp_number: data.whatsappNumber || null,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)
      .select()
      .single();
    store = updated;
  } else {
    const { data: created } = await supabase
      .from("stores")
      .insert({
        user_id: user.id,
        name: data.name,
        username: data.username,
        bio: data.bio || null,
        logo_url: data.logoUrl || null,
        whatsapp_number: data.whatsappNumber || null,
        plan: "FREE",
      })
      .select()
      .single();
    store = created;
  }

  return NextResponse.json(store);
}


