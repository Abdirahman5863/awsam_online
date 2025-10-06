import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import Link from "next/link"

interface Product {
  id: string | number
  name: string
  price: number
  image: string
  description: string
}

interface ProductGridProps {
  products: Product[]
  whatsappNumber?: string
}

export function ProductGrid({ products, whatsappNumber }: ProductGridProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Our Products</h2>
          <p className="text-muted-foreground">Discover our carefully curated collection</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} whatsappNumber={whatsappNumber} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product, whatsappNumber }: { product: Product; whatsappNumber?: string }) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur border-border/50 overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <Link href={`/store/demo/product/${product.id}`}>
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>
      <CardContent className="p-4">
        <Link href={`/store/demo/product/${product.id}`}>
          <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-foreground">${product.price}</span>
          <Button size="sm" asChild className="flex items-center gap-2">
            {(() => {
              const message = `Hi! I'm interested in ${product.name} ($${product.price}).`;
              const base = whatsappNumber ? `https://wa.me/${whatsappNumber}` : `https://wa.me/`
              const href = `${base}?text=${encodeURIComponent(message)}`
              return (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" />
                  Order on WhatsApp
                </a>
              )
            })()}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
