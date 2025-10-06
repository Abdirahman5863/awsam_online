interface Store {
  name: string
  bio: string
  coverImage?: string
}

interface StorefrontHeroProps {
  store: Store
}

export function StorefrontHero({ store }: StorefrontHeroProps) {
  return (
    <section className="py-12 lg:py-20 bg-gradient-to-b from-card/20 to-transparent">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">Welcome to {store.name}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-balance">{store.bio}</p>
        </div>
      </div>
    </section>
  )
}
