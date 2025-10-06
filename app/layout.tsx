import type React from "react"
import type { Metadata } from "next"
import { Inter} from 'next/font/google'

import { Suspense } from "react"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Inter({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Awsam.online - Smart Link-in-Bio Storefront",
  description:
    "Create beautiful storefronts for your brand. Showcase and sell products with our smart link-in-bio platform.",
  generator: "Awsam.online",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </ClerkProvider>
      </body>
    </html>
  )
}
