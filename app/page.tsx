import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Palette, ChartBar as BarChart3, Zap, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image
                src="/ChatGPT Image Sep 25, 2025, 02_23_12 PM.png"
                alt="Awsam.online Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="text-xl font-bold text-foreground">Awsam.online</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
              <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
              <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Get Started Free</Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-balance mb-6">
              <span className="inline-block mb-3 text-sm font-medium text-accent/90">✨ Launch your store in 5 minutes</span>
              Showcase Your Products.
              <br />
              Get Orders on WhatsApp.
            </h1>
            <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto leading-relaxed">
              Create beautiful link-in-bio storefronts that turn your social media followers into customers. Perfect for
              small brands selling through WhatsApp and TikTok.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/signup">
                  Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
                <Link href="#demo">Watch Demo</Link>
              </Button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>Free to start</span>
              <span>•</span>
              <span>No setup fees</span>
              <span>•</span>
              <span>5-min setup</span>
            </div>
          </div>
        </div>
      </section>

      {/* Storefront Preview */}
      <section className="pb-10">
        <div className="container mx-auto px-4">
          <Card className="p-8 bg-card/50 backdrop-blur text-center">
            <div className="text-sm text-muted-foreground mb-2">Awsam.online Storefront Preview</div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-accent text-sm">
              <span>💬</span>
              <span>+5 Orders Today!</span>
            </div>
          </Card>
        </div>
      </section>

      {/* Feature Headline */}
      <section className="py-8">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl lg:text-3xl font-bold mb-3">Everything You Need to Sell Online</h2>
          <p className="text-muted-foreground">
            Built specifically for small brands and creators who want to turn their social media presence into sales.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center bg-card/50">
              <div className="text-3xl font-bold text-accent mb-1">10K+</div>
              <div className="text-sm text-muted-foreground">Active Stores</div>
            </Card>
            <Card className="p-6 text-center bg-card/50">
              <div className="text-3xl font-bold text-accent mb-1">50K+</div>
              <div className="text-sm text-muted-foreground">Products Listed</div>
            </Card>
            <Card className="p-6 text-center bg-card/50">
              <div className="text-3xl font-bold text-accent mb-1">95%</div>
              <div className="text-sm text-muted-foreground">Order Success Rate</div>
            </Card>
            <Card className="p-6 text-center bg-card/50">
              <div className="text-3xl font-bold text-accent mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-card/50">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-5 h-5 text-accent" />
                <h3 className="font-semibold">Add Products Easily</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Upload product images, add descriptions, and set prices in seconds. No technical skills required.
              </p>
            </Card>
            <Card className="p-6 bg-card/50">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-5 h-5 text-accent" />
                <h3 className="font-semibold">Share Store Link</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Get your custom awsam.online/yourname link to share on TikTok, Instagram, or anywhere online.
              </p>
            </Card>
            <Card className="p-6 bg-card/50">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="w-5 h-5 text-accent" />
                <h3 className="font-semibold">Get More Orders</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Every product has an 'Order on WhatsApp' button that opens a pre-filled message for instant ordering.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground">
              Start free and upgrade when you're ready. No hidden fees, no surprises.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="p-8 bg-background border-border">
              <div className="text-sm text-muted-foreground mb-2">Perfect for getting started</div>
              <h3 className="text-2xl font-bold mb-1">Free</h3>
              <div className="text-4xl font-extrabold mb-6">$0 <span className="text-base font-medium text-muted-foreground">/forever</span></div>
              <Button className="w-full mb-6" asChild>
                <Link href="/signup">Get Started Free</Link>
              </Button>
              <div className="text-sm text-muted-foreground">What's included:</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>Up to 3 products</li>
                <li>Custom store link</li>
                <li>WhatsApp integration</li>
                <li>Mobile-responsive design</li>
                <li>Basic analytics</li>
              </ul>
            </Card>
            <Card className="p-8 bg-background border-border relative">
              <div className="absolute -top-3 right-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">Most Popular</div>
              <div className="text-sm text-muted-foreground mb-2">For growing businesses</div>
              <h3 className="text-2xl font-bold mb-1">Pro</h3>
              <div className="text-4xl font-extrabold mb-6">$10 <span className="text-base font-medium text-muted-foreground">/per month</span></div>
              <Button variant="outline" className="w-full bg-transparent mb-6" asChild>
                <Link href="/signup">Start Pro Trial</Link>
              </Button>
              <div className="text-sm text-muted-foreground">What's included:</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>Unlimited products</li>
                <li>Custom store link</li>
                <li>WhatsApp integration</li>
                <li>Mobile-responsive design</li>
                <li>Advanced analytics</li>
                <li>Custom branding</li>
                <li>Priority support</li>
                <li>Export customer data</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" id="contact">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold mb-2">Can I upgrade or downgrade at any time?</h3>
              <p className="text-muted-foreground">Yes! You can change your plan at any time. Upgrades take effect immediately, and downgrades will take effect at the end of your billing cycle.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is there a setup fee?</h3>
              <p className="text-muted-foreground">No setup fees! You only pay for your chosen plan. The free plan is completely free forever.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How does the WhatsApp integration work?</h3>
              <p className="text-muted-foreground">When customers click 'Order on WhatsApp', it opens their WhatsApp app with a pre-filled message including the product name and your phone number.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/ChatGPT Image Sep 25, 2025, 02_23_12 PM.png"
                  alt="Awsam.online Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <span className="text-xl font-bold">Awsam.online</span>
              </div>
              <p className="text-sm text-muted-foreground">The easiest way to create beautiful storefronts for WhatsApp and social media sales.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    GDPR
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground space-y-2">
            <p>&copy; 2024 Awsam.online. All rights reserved.</p>
            <div className="flex items-center justify-center gap-4">
              <Link href="#" className="hover:text-foreground transition-colors">Twitter</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Instagram</Link>
              <Link href="#" className="hover:text-foreground transition-colors">LinkedIn</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
