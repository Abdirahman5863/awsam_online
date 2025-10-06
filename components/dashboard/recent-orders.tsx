import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function RecentOrders() {
  const orders = [
    {
      id: "#3421",
      customer: "Sarah Johnson",
      amount: "$89.97",
      status: "completed",
      date: "2 hours ago",
    },
    {
      id: "#3420",
      customer: "Mike Chen",
      amount: "$29.99",
      status: "processing",
      date: "4 hours ago",
    },
    {
      id: "#3419",
      customer: "Emma Davis",
      amount: "$149.95",
      status: "shipped",
      date: "1 day ago",
    },
    {
      id: "#3418",
      customer: "Alex Rodriguez",
      amount: "$39.98",
      status: "completed",
      date: "2 days ago",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "processing":
        return "secondary"
      case "shipped":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <Card className="bg-card/50 backdrop-blur border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from your storefront</CardDescription>
          </div>
          <Button variant="outline" asChild>
            <Link href="/dashboard/orders">View All</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="font-medium text-foreground">{order.id}</h3>
                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium text-foreground">{order.amount}</p>
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                </div>
                <Badge variant={getStatusColor(order.status)} className="capitalize">
                  {order.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
