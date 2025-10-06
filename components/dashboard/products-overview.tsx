import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreHorizontal } from "lucide-react"
import Link from "next/link"

export function ProductsOverview() {
  const products = [
    {
      id: 1,
      name: "Premium T-Shirt",
      price: "$29.99",
      stock: 45,
      status: "active",
      image: "/plain-white-tshirt.png",
    },
    {
      id: 2,
      name: "Designer Hoodie",
      price: "$59.99",
      stock: 12,
      status: "active",
      image: "/cozy-hoodie.png",
    },
    {
      id: 3,
      name: "Canvas Tote Bag",
      price: "$19.99",
      stock: 0,
      status: "out-of-stock",
      image: "/simple-canvas-tote.png",
    },
    {
      id: 4,
      name: "Sticker Pack",
      price: "$9.99",
      stock: 128,
      status: "active",
      image: "/assorted-stickers.png",
    },
  ]

  return (
    <Card className="bg-card/50 backdrop-blur border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your product catalog</CardDescription>
          </div>
          <Button asChild>
            <Link href="/dashboard/products">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover bg-muted"
                />
                <div>
                  <h3 className="font-medium text-foreground">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{product.stock} in stock</p>
                  <Badge variant={product.status === "active" ? "default" : "secondary"} className="text-xs">
                    {product.status === "active" ? "Active" : "Out of Stock"}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Button variant="outline" className="w-full bg-transparent" asChild>
            <Link href="/dashboard/products">View All Products</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
