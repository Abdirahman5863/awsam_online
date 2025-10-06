import { Button } from "@/components/ui/button"
import { Instagram, Twitter, Globe, Heart } from "lucide-react"
import Link from "next/link"

interface Store {
  name: string
  username: string
  socialLinks: {
    instagram?: string
    twitter?: string
    website?: string
  }
}

interface StorefrontFooterProps {
  store: Store
}

export function StorefrontFooter({ store }: StorefrontFooterProps) {
  return (
    <footer className="border-t border-border/40 bg-card/20 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">{store.name}</h3>
            <p className="text-muted-foreground">@{store.username}</p>
          </div>

          <div className="flex justify-center space-x-4">
            {store.socialLinks.instagram && (
              <Button variant="outline" size="sm" asChild>
                <Link href={store.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram
                </Link>
              </Button>
            )}
            {store.socialLinks.twitter && (
              <Button variant="outline" size="sm" asChild>
                <Link href={store.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Link>
              </Button>
            )}
            {store.socialLinks.website && (
              <Button variant="outline" size="sm" asChild>
                <Link href={store.socialLinks.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="w-4 h-4 mr-2" />
                  Website
                </Link>
              </Button>
            )}
          </div>

          <div className="pt-6 border-t border-border/40">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              Made with <Heart className="w-4 h-4 text-accent" /> on{" "}
              <Link href="/" className="text-accent hover:underline">
                Awsam.online
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
