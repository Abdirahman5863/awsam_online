import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontHero } from "@/components/storefront/storefront-hero"
import { ProductGrid } from "@/components/storefront/product-grid"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase"

interface StorefrontPageProps {
  params: {
    username: string
  }
}

async function getStoreData(username: string) {
  const { data: store } = await supabase
    .from("stores")
    .select("*")
    .eq("username", username)
    .maybeSingle();

  if (!store) return null;

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("store_id", store.id)
    .order("created_at", { ascending: false });

  return {
    name: store.name,
    username: store.username,
    bio: store.bio || "",
    avatar: store.logo_url || "/placeholder-user.jpg",
    coverImage: "/modern-storefront-hero.png",
    theme: {
      primaryColor: "oklch(0.7 0.15 142)",
      backgroundColor: "oklch(0.08 0 0)",
    },
    socialLinks: {},
    whatsappNumber: store.whatsapp_number || undefined,
    products: (products || []).map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price_cents / 100,
      image: p.image_url || "/placeholder.jpg",
      description: p.description || "",
    })),
  };
}

export default async function StorefrontPage({ params }: StorefrontPageProps) {
  const store = await getStoreData(params.username)

  if (!store) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <StorefrontHeader store={store} />
      <StorefrontHero store={store} />
      <ProductGrid products={store.products} whatsappNumber={store.whatsappNumber} />
      <StorefrontFooter store={store} />
    </div>
  )
}
