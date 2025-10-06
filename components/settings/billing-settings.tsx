import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Download, Star, Zap } from "lucide-react"

export function BillingSettings() {
  const currentPlan = {
    name: "Pro",
    price: "$19",
    period: "month",
    features: ["Unlimited products", "Custom domain", "Advanced analytics", "Priority support"],
  }

  const invoices = [
    { id: "INV-001", date: "Dec 1, 2024", amount: "$19.00", status: "paid" },
    { id: "INV-002", date: "Nov 1, 2024", amount: "$19.00", status: "paid" },
    { id: "INV-003", date: "Oct 1, 2024", amount: "$19.00", status: "paid" },
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Manage your subscription and billing information.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{currentPlan.name} Plan</h3>
                <p className="text-muted-foreground">
                  {currentPlan.price}/{currentPlan.period}
                </p>
              </div>
            </div>
            <Badge variant="default">Active</Badge>
          </div>

          <div className="space-y-2 mb-6">
            {currentPlan.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Zap className="w-4 h-4" />
              Upgrade Plan
            </Button>
            <Button variant="outline">Cancel Subscription</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Manage your payment information.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/25</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Update
            </Button>
          </div>
          <Button variant="outline" className="w-full bg-transparent">
            Add Payment Method
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Download your invoices and view payment history.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium text-foreground">{invoice.id}</p>
                    <p className="text-sm text-muted-foreground">{invoice.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-foreground">{invoice.amount}</span>
                  <Badge variant="outline" className="capitalize">
                    {invoice.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
