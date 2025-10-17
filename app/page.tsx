"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowRight, BarChart3, Zap, Globe, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background/95 to-muted/30">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-border/40 backdrop-blur-md bg-background/60">
        <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
          <div className="flex items-center gap-2">
            <Image
              src="/ChatGPT Image Sep 25, 2025, 02_23_12 PM.png"
              alt="Awsam Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-bold text-lg">Awsam.online</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">
              Pricing
            </Link>
            
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-6"
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
            Showcase Your Products. <br />
            <span className="text-accent">Sell Effortlessly via WhatsApp.</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-10">
            Build a modern storefront for your social bio — get WhatsApp orders directly from your followers in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/sign-up">
                Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link href="#demo">See How It Works</Link>
            </Button>
          </div>

          {/* Floating preview mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-16 flex justify-center"
          >
            <Card className="relative p-4 w-full max-w-3xl shadow-lg bg-background border-border/60">
              <Image
                src="/preview.png"
                alt="Awsam Storefront Preview"
                width={1000}
                height={600}
                className="rounded-xl object-cover w-full"
              />
              <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 text-xs rounded-full shadow-sm">
                +5 Orders Today!
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-3">Powerful Features. Simple Setup.</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Awsam.online helps you launch a storefront that converts — no tech skills needed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="text-accent w-6 h-6" />}
              title="Add Products Easily"
              desc="Upload product photos, names, and prices in seconds. Your catalog updates instantly."
            />
            <FeatureCard
              icon={<Globe className="text-accent w-6 h-6" />}
              title="Share Anywhere"
              desc="Share your awsam.online link on Instagram, TikTok, or Facebook — one link for everything."
            />
            <FeatureCard
              icon={<BarChart3 className="text-accent w-6 h-6" />}
              title="Get More Orders"
              desc="Every product has a pre-filled WhatsApp message for instant ordering."
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/30 border-t border-b border-border/40">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <StatCard number="10K+" label="Active Stores" />
          <StatCard number="50K+" label="Products Listed" />
          <StatCard number="95%" label="Order Success Rate" />
          <StatCard number="24/7" label="Support" />
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-28">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground mb-16">
            Start free, grow with Pro — no hidden fees or setup costs.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <PricingCard
              plan="Free"
              price="Ksh 0"
              desc="Perfect for getting started"
              features={[
                "5 products",
                "Custom store link",
                "WhatsApp integration",
                "Mobile responsive",
              ]}
              buttonText="Get Started"
              href="/sign-up"
            />
            <PricingCard
              plan="Pro"
              price="Ksh 500/mo"
              desc="For growing brands"
              highlight
              features={[
                "Unlimited products",
                "WhatsApp integration",
                "Mobile responsive",
                "Custom store link",
              
                "Advanced analytics",
                "Priority support",
              ]}
              buttonText="Start Pro Trial"
              href="/sign-up"
           
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/40 bg-background">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
          <p>© {new Date().getFullYear()} Awsam.online — All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#">Twitter</Link>
            <Link href="#">Instagram</Link>
            <Link href="#">LinkedIn</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// --- COMPONENTS ---

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl bg-card/50 border border-border/40 shadow-sm hover:shadow-md transition-all"
    >
      <div className="mb-3">{icon}</div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </motion.div>
  )
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <Card className="p-6 bg-card/50">
      <div className="text-3xl font-bold text-accent mb-1">{number}</div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </Card>
  )
}

function PricingCard({
  plan,
  price,
  desc,
  features,
  buttonText,
  href,
  highlight,
}: {
  plan: string
  price: string
  desc: string
  features: string[]
  buttonText: string
  href: string
  highlight?: boolean
}) {
  return (
    <Card
      className={`p-8 border ${
        highlight ? "border-accent shadow-lg scale-[1.02]" : "border-border/60"
      }`}
    >
      {highlight && (
        <div className="absolute -top-3 right-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2">{plan}</h3>
      <p className="text-muted-foreground mb-6">{desc}</p>
      <div className="text-4xl font-extrabold mb-6">{price}</div>
      <Button
        variant={highlight ? "default" : "outline"}
        className="w-full mb-6"
        asChild
      >
        <Link href={href}>{buttonText}</Link>
      </Button>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {features.map((f, i) => (
          <li key={i}>• {f}</li>
        ))}
      </ul>
    </Card>
  )
}
