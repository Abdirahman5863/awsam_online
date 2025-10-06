import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProductsManager } from "@/components/dashboard/products-manager"

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Products</h1>
            <p className="text-muted-foreground">Manage your product catalog and inventory.</p>
          </div>

          <ProductsManager />
        </div>
      </main>
    </div>
  )
}
