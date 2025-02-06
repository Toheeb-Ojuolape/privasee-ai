"use client";
import { ReactNode, Suspense } from "react";
import { UsersProvider } from "@/context/users-context";
import { loginIsRequiredServer } from "@/lib/auth";
import AuthLayout from "@/components/layouts/AuthLayout";



export default function AuthenticatedPages({ children }: { children: ReactNode }) {

  return (
    <UsersProvider>
      <Suspense>
        <AuthLayout>
          {children}
        </AuthLayout>
      </Suspense>
    </UsersProvider>
  )
}