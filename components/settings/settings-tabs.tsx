"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSettings } from "./profile-settings"
import { StorefrontSettings } from "./storefront-settings"
import { AccountSettings } from "./account-settings"
import { BillingSettings } from "./billing-settings"

export function SettingsTabs() {
  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4 bg-card/50">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="storefront">Storefront</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <ProfileSettings />
      </TabsContent>

      <TabsContent value="storefront">
        <StorefrontSettings />
      </TabsContent>

      <TabsContent value="account">
        <AccountSettings />
      </TabsContent>

      <TabsContent value="billing">
        <BillingSettings />
      </TabsContent>
    </Tabs>
  )
}
