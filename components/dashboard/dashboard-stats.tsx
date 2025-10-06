import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, ShoppingBag, Users } from "lucide-react"

export function DashboardStats() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$12,450",
      change: "+12.5%",
      icon: DollarSign,
      trend: "up",
    },
    {
      title: "Orders",
      value: "156",
      change: "+8.2%",
      icon: ShoppingBag,
      trend: "up",
    },
    {
      title: "Visitors",
      value: "2,847",
      change: "+23.1%",
      icon: Users,
      trend: "up",
    },
    {
      title: "Conversion Rate",
      value: "5.4%",
      change: "+2.1%",
      icon: TrendingUp,
      trend: "up",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-accent flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
