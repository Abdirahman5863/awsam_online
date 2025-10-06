import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SettingsTabs } from "@/components/settings/settings-tabs"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account and storefront preferences.</p>
          </div>

          <SettingsTabs />
        </div>
      </main>
    </div>
  )
}
