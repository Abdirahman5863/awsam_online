import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { ProductsOverview } from "@/components/dashboard/products-overview"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your storefront.</p>
          </div>

          <DashboardStats />

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <ProductsOverview />
              <RecentOrders />
            </div>
            <div>
              <QuickActions />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
