"use client"

import { SessionProvider } from "next-auth/react"

export default function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>
}

// It allows the application to access the authentication session throughout its component tree.
// The SessionProvider is used to manage user sessions and provide authentication context to the application.
// This is useful for protecting routes and managing user authentication state in a Next.js application.
