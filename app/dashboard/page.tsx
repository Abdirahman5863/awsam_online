"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Share2, Eye, ShoppingBag } from "lucide-react"

export default function DashboardPage() {
  const [hasStorefront, setHasStorefront] = useState(true)

  const stats = [
    { label: "Total Products", value: 8, icon: <ShoppingBag className="w-5 h-5 text-primary" /> },
    { label: "WhatsApp Orders", value: 25, icon: <Share2 className="w-5 h-5 text-green-500" /> },
    { label: "Store Views", value: 120, icon: <Eye className="w-5 h-5 text-blue-500" /> },
  ]

  if (hasStorefront) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Your Storefront</h1>
          <p className="text-muted-foreground mb-6">
            Get started by setting your store name, logo, and WhatsApp number. You’ll receive a shareable storefront link instantly.
          </p>
          <Button size="lg" onClick={() => setHasStorefront(true)}>
            Create Storefront
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back 👋</h1>
            <p className="text-muted-foreground text-sm">
              Manage your storefront, products, and WhatsApp orders.
            </p>
          </div>
          <Button variant="default" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>
      </header>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-card border rounded-2xl p-5 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <h2 className="text-2xl font-bold">{stat.value}</h2>
            </div>
            <div className="p-3 rounded-xl bg-muted flex items-center justify-center">
              {stat.icon}
            </div>
          </div>
        ))}
      </section>

      {/* Storefront Preview + Actions */}
      <section className="container mx-auto px-6 pb-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-card border rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Storefront Preview</h3>
          <div className="aspect-video bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
            Your storefront preview will appear here.
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              Share your storefront link:
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-primary font-medium text-sm">awsam.online/yourstore</span>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Share2 className="w-4 h-4" /> Copy Link
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold">Quick Actions</h3>
          <div className="flex flex-col space-y-3">
            <Button variant="default" className="w-full flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add New Product
            </Button>
            <Button variant="secondary" className="w-full flex items-center gap-2">
              🎨 Customize Storefront
            </Button>
            <Button variant="outline" className="w-full flex items-center gap-2">
              <Share2 className="w-4 h-4" /> Share Store Link
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
