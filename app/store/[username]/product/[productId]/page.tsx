import { ProductDetail } from "@/components/storefront/product-detail"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase"

interface ProductPageProps {
  params: {
    username: string
    productId: string
  }
}

async function getProductData(username: string, productId: string) {
  const { data: store } = await supabase
    .from("stores")
    .select("*")
    .eq("username", username)
    .maybeSingle();

  if (!store) return null;

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .eq("store_id", store.id)
    .maybeSingle();

  if (!product) return null;

  return {
    store: {
      name: store.name,
      username: store.username,
      bio: store.bio || "",
      avatar: store.logo_url || "/placeholder-user.jpg",
      theme: {
        primaryColor: "oklch(0.7 0.15 142)",
        backgroundColor: "oklch(0.08 0 0)",
      },
      socialLinks: {},
      whatsappNumber: store.whatsapp_number || undefined,
    },
    product: {
      id: product.id,
      name: product.name,
      price: product.price_cents / 100,
      image: product.image_url || "/placeholder.jpg",
      description: product.description || "",
      images: [product.image_url || "/placeholder.jpg"],
      sizes: [],
      colors: [],
      inStock: true,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const data = await getProductData(params.username, params.productId)

  if (!data) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <StorefrontHeader store={data.store} />
      <ProductDetail product={data.product} store={data.store} />
      <StorefrontFooter store={data.store} />
    </div>
  )
}
