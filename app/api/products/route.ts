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

  if (!user) return NextResponse.json({ products: [] });

  const { data: store } = await supabase
    .from("stores")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!store) return NextResponse.json({ products: [] });

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("store_id", store.id)
    .order("created_at", { ascending: false });

  return NextResponse.json({ products: products || [] });
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();

  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("clerk_id", userId)
    .maybeSingle();

  if (!user) return new NextResponse("User not found", { status: 404 });

  const { data: store } = await supabase
    .from("stores")
    .select("id, plan")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!store) return new NextResponse("No store", { status: 400 });

  const { count } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("store_id", store.id);

  if (store.plan === "FREE" && count && count >= 3) {
    return new NextResponse("Free plan limit reached (3 products)", { status: 403 });
  }

  const { data: product } = await supabase
    .from("products")
    .insert({
      store_id: store.id,
      name: body.name,
      price_cents: Math.round(Number(body.price) * 100),
      description: body.description || null,
      image_url: body.imageUrl || null,
    })
    .select()
    .single();

  return NextResponse.json(product, { status: 201 });
}

export async function PUT(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();
  const { id, name, price, description, imageUrl } = body;

  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("clerk_id", userId)
    .maybeSingle();

  if (!user) return new NextResponse("User not found", { status: 404 });

  const { data: store } = await supabase
    .from("stores")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!store) return new NextResponse("No store", { status: 400 });

  const { data: product } = await supabase
    .from("products")
    .update({
      name,
      price_cents: Math.round(Number(price) * 100),
      description: description || null,
      image_url: imageUrl || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("store_id", store.id)
    .select()
    .single();

  if (!product) return new NextResponse("Product not found", { status: 404 });

  return NextResponse.json(product);
}

export async function DELETE(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("id");

  if (!productId) return new NextResponse("Product ID required", { status: 400 });

  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("clerk_id", userId)
    .maybeSingle();

  if (!user) return new NextResponse("User not found", { status: 404 });

  const { data: store } = await supabase
    .from("stores")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!store) return new NextResponse("No store", { status: 400 });

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId)
    .eq("store_id", store.id);

  if (error) return new NextResponse("Failed to delete product", { status: 500 });

  return new NextResponse(null, { status: 204 });
}


