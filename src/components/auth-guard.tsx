"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface AuthGuardProps {
  children: ReactNode;
  redirectTo?: string; // default redirect for authenticated users
}

export default function AuthGuard({
  children,
  redirectTo = "/home",
}: AuthGuardProps) {
  const { status } = useSession();
  const router = useRouter();

  // Redirect authenticated users to protected route
  useEffect(() => {
    if (status === "authenticated") {
      router.push(redirectTo); // use replace to avoid back button returning to /signin
    }
  }, [status, router, redirectTo]);

  // Loading state (session still being checked)
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">loading...</p>
      </div>
    );
  }

  // If unauthenticated, show the auth page
  if (status === "unauthenticated") {
    return <>{children}</>;
  }

  // While redirecting, render nothing
  return null;
}
