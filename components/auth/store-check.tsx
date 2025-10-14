"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export function StoreCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [hasStore, setHasStore] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkStore = async () => {
      if (!isLoaded) return;

      if (!user) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("/api/store");
        if (response.ok) {
          const store = await response.json();

          if (!store) {
            router.push("/onboarding");
            setHasStore(false);
          } else {
            setHasStore(true);
          }
        } else {
          router.push("/onboarding");
          setHasStore(false);
        }
      } catch (error) {
        console.error("Store check error:", error);
        router.push("/onboarding");
        setHasStore(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkStore();
  }, [user, isLoaded, router]);

  if (!isLoaded || isChecking || hasStore === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (hasStore === false) {
    return null;
  }

  return <>{children}</>;
}
