import { SignIn } from "@clerk/nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/ChatGPT Image Sep 25, 2025, 02_23_12 PM.png"
              alt="Awsam.online Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-xl font-bold text-foreground">Awsam.online</span>
          </Link>
        </div>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <SignIn routing="hash" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
