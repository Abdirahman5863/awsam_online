import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Instagram, Twitter, Globe, MessageCircle } from "lucide-react"
import Link from "next/link"

interface Store {
  name: string
  username: string
  bio: string
  avatar: string
  socialLinks: {
    instagram?: string
    twitter?: string
    website?: string
  }
}

interface StorefrontHeaderProps {
  store: Store
}

export function StorefrontHeader({ store }: StorefrontHeaderProps) {
  return (
    <header className="border-b border-border/40 bg-card/20 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href={`/store/${store.username}`} className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={store.avatar || "/placeholder.svg"} alt={store.name} />
              <AvatarFallback>{store.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-foreground">{store.name}</h1>
              <p className="text-sm text-muted-foreground">@{store.username}</p>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3">
              {store.socialLinks.instagram && (
                <Button variant="ghost" size="sm" asChild>
                  <Link href={store.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-4 h-4" />
                  </Link>
                </Button>
              )}
              {store.socialLinks.twitter && (
                <Button variant="ghost" size="sm" asChild>
                  <Link href={store.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4" />
                  </Link>
                </Button>
              )}
              {store.socialLinks.website && (
                <Button variant="ghost" size="sm" asChild>
                  <Link href={store.socialLinks.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4" />
                  </Link>
                </Button>
              )}
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent" asChild>
              {(() => {
                const href = `https://wa.me/?text=${encodeURIComponent("Hi! I have a question about your store.")}`
                return (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </a>
                )
              })()}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
