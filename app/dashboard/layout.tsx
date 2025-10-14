import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs"
import { StoreCheck } from "@/components/auth/store-check"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>
        <StoreCheck>{children}</StoreCheck>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}
