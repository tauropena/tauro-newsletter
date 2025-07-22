"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AuthCheck({ children }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session) {
    return null // Return null while waiting for redirect
  }

  return children
}

// TEST AND IMPROVE THE VIBES FOR THE LOADING PAGE
