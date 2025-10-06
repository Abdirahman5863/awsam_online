"use client"

import type React from "react"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Loader2, Palette, ExternalLink } from "lucide-react"
import Link from "next/link"

export function StorefrontSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    storeName: "",
    username: "",
    logoUrl: "",
    bio: "",
    customDomain: "",
    theme: "dark",
    accentColor: "#4ade80",
    showSocialLinks: true,
    showPoweredBy: true,
    whatsappNumber: "",
    seoTitle: "",
    seoDescription: "",
  })

  const storeLink = useMemo(() => (settings.username ? `https://awsam.online/${settings.username}` : ""), [settings.username])

  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      try {
        const res = await fetch("/api/store", { cache: "no-store" })
        if (res.ok) {
          const store = await res.json()
          if (store) {
            setSettings((prev) => ({
              ...prev,
              storeName: store.name ?? "",
              username: store.username ?? "",
              logoUrl: store.logoUrl ?? "",
              bio: store.bio ?? "",
              whatsappNumber: store.whatsappNumber ?? "",
              seoTitle: store.name ? `${store.name} - Storefront` : "",
              seoDescription: store.bio ?? "",
            }))
          }
        }
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch("/api/store", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: settings.storeName,
          username: settings.username,
          bio: settings.bio || null,
          logoUrl: settings.logoUrl || null,
          whatsappNumber: settings.whatsappNumber || null,
        }),
      })
      if (!res.ok) {
        console.error("Failed to save settings")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const updateSetting = (field: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle>Storefront Appearance</CardTitle>
          <CardDescription>Customize how your storefront looks to customers.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="storeName">Business Name</Label>
              <Input
                id="storeName"
                value={settings.storeName}
                onChange={(e) => updateSetting("storeName", e.target.value)}
                className="bg-input border-border"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username (store link)</Label>
                <Input
                  id="username"
                  value={settings.username}
                  onChange={(e) => updateSetting("username", e.target.value)}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                <Input
                  id="whatsappNumber"
                  value={settings.whatsappNumber}
                  onChange={(e) => updateSetting("whatsappNumber", e.target.value)}
                  placeholder="e.g. 15551234567"
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="logoUrl">Logo URL</Label>
                <Input
                  id="logoUrl"
                  value={settings.logoUrl}
                  onChange={(e) => updateSetting("logoUrl", e.target.value)}
                  placeholder="https://..."
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  value={settings.bio}
                  onChange={(e) => updateSetting("bio", e.target.value)}
                  placeholder="Short description of your brand"
                  className="bg-input border-border"
                />
              </div>
            </div>

            {storeLink && (
              <div className="space-y-2">
                <Label>Store Link</Label>
                <div className="flex gap-2">
                  <Input readOnly value={storeLink} className="bg-input border-border" />
                  <Button type="button" variant="outline" className="bg-transparent" onClick={() => navigator.clipboard.writeText(storeLink)}>
                    Copy
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="customDomain">Custom Domain (Optional)</Label>
              <Input
                id="customDomain"
                value={settings.customDomain}
                onChange={(e) => updateSetting("customDomain", e.target.value)}
                placeholder="shop.yourdomain.com"
                className="bg-input border-border"
              />
              <p className="text-xs text-muted-foreground">
                Connect your own domain instead of using awsam.online/username
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={settings.theme} onValueChange={(value) => updateSetting("theme", value)}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accentColor">Accent Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="accentColor"
                    type="color"
                    value={settings.accentColor}
                    onChange={(e) => updateSetting("accentColor", e.target.value)}
                    className="w-16 h-10 p-1 bg-input border-border"
                  />
                  <Input
                    value={settings.accentColor}
                    onChange={(e) => updateSetting("accentColor", e.target.value)}
                    className="flex-1 bg-input border-border"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Display Options</h3>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Social Links</Label>
                  <p className="text-sm text-muted-foreground">Display social media links in your storefront</p>
                </div>
                <Switch
                  checked={settings.showSocialLinks}
                  onCheckedChange={(checked) => updateSetting("showSocialLinks", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show "Powered by Awsam.online"</Label>
                  <p className="text-sm text-muted-foreground">Display attribution in your storefront footer</p>
                </div>
                <Switch
                  checked={settings.showPoweredBy}
                  onCheckedChange={(checked) => updateSetting("showPoweredBy", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                <Input
                  id="whatsappNumber"
                  value={settings.whatsappNumber}
                  onChange={(e) => updateSetting("whatsappNumber", e.target.value)}
                  placeholder="e.g. 15551234567"
                  className="bg-input border-border"
                />
                <p className="text-xs text-muted-foreground">Enter your phone in international format without + or spaces.</p>
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="flex items-center gap-2">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
          <CardDescription>Optimize your storefront for search engines.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  value={settings.seoTitle}
                  onChange={(e) => updateSetting("seoTitle", e.target.value)}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seoDescription">SEO Description</Label>
                <Input
                  id="seoDescription"
                  value={settings.seoDescription}
                  onChange={(e) => updateSetting("seoDescription", e.target.value)}
                  className="bg-input border-border"
                />
              </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent" asChild>
              <Link href="/store/demo" target="_blank">
                <ExternalLink className="w-4 h-4" />
                Preview Store
              </Link>
            </Button>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Palette className="w-4 h-4" />
              Advanced Customization
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
