import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Settings, Palette, ExternalLink } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "Add Product",
      description: "Add a new product to your catalog",
      icon: Plus,
      href: "/dashboard/products/new",
      variant: "default" as const,
    },
    {
      title: "Customize Store",
      description: "Update your storefront design",
      icon: Palette,
      href: "/dashboard/customize",
      variant: "outline" as const,
    },
    {
      title: "Store Settings",
      description: "Configure your store preferences",
      icon: Settings,
      href: "/dashboard/settings",
      variant: "outline" as const,
    },
  ]

  return (
    <Card className="bg-card/50 backdrop-blur border-border/50">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action) => (
            <Button key={action.title} variant={action.variant} className="w-full justify-start h-auto p-4" asChild>
              <Link href={action.href}>
                <div className="flex items-start space-x-3">
                  <action.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                  </div>
                </div>
              </Link>
            </Button>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <Button variant="outline" className="w-full bg-transparent" asChild>
            <Link href="/store/demo" className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Preview Your Store
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
