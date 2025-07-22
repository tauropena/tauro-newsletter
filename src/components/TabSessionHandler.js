"use client"
import { signOut } from "next-auth/react"
import { useEffect } from "react"

export default function TabSessionHandler() {
  useEffect(() => {
    if (typeof window === "undefined") return

    // Initialize tab session
    if (!sessionStorage.getItem("tab-session")) {
      sessionStorage.setItem("tab-session", "active")
      localStorage.setItem("tab-alive", Date.now())
      return
    }

    // Check every 5 seconds if tab is still active
    const interval = setInterval(() => {
      const lastActive = localStorage.getItem("tab-alive")

      // If no recent activity (tab closed)
      if (!lastActive || Date.now() - lastActive > 7000) {
        signOut({ callbackUrl: "/login" })
        sessionStorage.removeItem("tab-session")
      }
    }, 5000)

    // Update activity timestamp every 2 seconds
    const heartbeat = setInterval(() => {
      localStorage.setItem("tab-alive", Date.now())
    }, 2000)

    return () => {
      clearInterval(interval)
      clearInterval(heartbeat)
      localStorage.removeItem("tab-alive")
    }
  }, [])

  return null
}
