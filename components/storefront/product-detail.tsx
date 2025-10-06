"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Heart, Share2, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  images?: string[]
  sizes?: string[]
  colors?: string[]
  inStock: boolean
}

interface Store {
  name: string
  username: string
  whatsappNumber?: string
}

interface ProductDetailProps {
  product: Product
  store: Store
}

export function ProductDetail({ product, store }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)

  const images = product.images || [product.image]
  const productUrl = typeof window !== "undefined" ? window.location.href : ""
  const baseMessage = `Hi! I'm interested in ${product.name} from ${store.name}.` 

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="flex items-center gap-2">
          <Link href={`/store/${store.username}`}>
            <ArrowLeft className="w-4 h-4" />
            Back to Store
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <img
              src={images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-accent" : "border-border"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold text-accent">${product.price}</span>
              {product.inStock ? (
                <Badge variant="default">In Stock</Badge>
              ) : (
                <Badge variant="secondary">Out of Stock</Badge>
              )}
            </div>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          {/* Size Selection */}
          {product.sizes && (
            <div>
              <h3 className="font-semibold text-foreground mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && (
            <div>
              <h3 className="font-semibold text-foreground mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Quantity</h3>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                +
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Button size="lg" className="w-full flex items-center gap-2" asChild disabled={!product.inStock}>
              {(() => {
                const details = [`Quantity: ${quantity}`]
                if (selectedSize) details.push(`Size: ${selectedSize}`)
                if (selectedColor) details.push(`Color: ${selectedColor}`)
                const composed = `${baseMessage} ${details.join(" | ")}${productUrl ? `\n${productUrl}` : ""}`
                const base = store.whatsappNumber ? `https://wa.me/${store.whatsappNumber}` : `https://wa.me/`
                const href = `${base}?text=${encodeURIComponent(composed)}`
                return (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5" />
                    {product.inStock ? "Order on WhatsApp" : "Out of Stock"}
                  </a>
                )
              })()}
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" size="lg" className="flex-1 flex items-center gap-2 bg-transparent">
                <Heart className="w-4 h-4" />
                Save
              </Button>
              <Button variant="outline" size="lg" className="flex-1 flex items-center gap-2 bg-transparent">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Store Info */}
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-foreground">Sold by {store.name}</h4>
                  <p className="text-sm text-muted-foreground">@{store.username}</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/store/${store.username}`}>View Store</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
