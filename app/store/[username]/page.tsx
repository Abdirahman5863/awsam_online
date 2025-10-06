import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontHero } from "@/components/storefront/storefront-hero"
import { ProductGrid } from "@/components/storefront/product-grid"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"

interface StorefrontPageProps {
  params: {
    username: string
  }
}

async function getStoreData(username: string) {
  const store = await prisma.store.findUnique({
    where: { username },
    include: { products: { orderBy: { createdAt: "desc" } } },
  })
  if (!store) return null
  return {
    name: store.name,
    username: store.username,
    bio: store.bio ?? "",
    avatar: store.logoUrl ?? "/placeholder-user.jpg",
    coverImage: "/modern-storefront-hero.png",
    theme: {
      primaryColor: "oklch(0.7 0.15 142)",
      backgroundColor: "oklch(0.08 0 0)",
    },
    socialLinks: {},
    whatsappNumber: store.whatsappNumber ?? undefined,
    products: store.products.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.priceCents / 100,
      image: p.imageUrl ?? "/placeholder.jpg",
      description: p.description ?? "",
    })),
  }
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
