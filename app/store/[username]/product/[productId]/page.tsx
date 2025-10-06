import { ProductDetail } from "@/components/storefront/product-detail"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: {
    username: string
    productId: string
  }
}

// Mock data - in real app this would come from database
const getProductData = (username: string, productId: string) => {
  const stores = {
    demo: {
      name: "Demo Store",
      username: "demo",
      bio: "Premium lifestyle products for the modern creator.",
      avatar: "/diverse-user-avatars.png",
      theme: {
        primaryColor: "oklch(0.7 0.15 142)",
        backgroundColor: "oklch(0.08 0 0)",
      },
      socialLinks: {
        instagram: "https://instagram.com/demo",
        twitter: "https://twitter.com/demo",
        website: "https://demo.com",
      },
      products: [
        {
          id: 1,
          name: "Premium T-Shirt",
          price: 29.99,
          image: "/plain-white-tshirt.png",
          description:
            "High-quality cotton t-shirt with custom design. Made from 100% organic cotton for ultimate comfort and durability.",
          images: ["/plain-white-tshirt.png", "/t-shirt-product.jpg"],
          sizes: ["XS", "S", "M", "L", "XL", "XXL"],
          colors: ["White", "Black", "Gray"],
          inStock: true,
        },
        {
          id: 2,
          name: "Designer Hoodie",
          price: 59.99,
          image: "/cozy-hoodie.png",
          description: "Comfortable hoodie with premium materials. Perfect for casual wear and staying cozy.",
          images: ["/cozy-hoodie.png", "/cozy-hoodie-display.png"],
          sizes: ["S", "M", "L", "XL", "XXL"],
          colors: ["Gray", "Black", "Navy"],
          inStock: true,
        },
      ],
    },
  }

  const store = stores[username as keyof typeof stores]
  if (!store) return null

  const product = store.products.find((p) => p.id === Number.parseInt(productId))
  if (!product) return null

  return { store, product }
}

export default function ProductPage({ params }: ProductPageProps) {
  const data = getProductData(params.username, params.productId)

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
