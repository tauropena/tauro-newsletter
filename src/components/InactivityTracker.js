"use client"
import { signOut } from "next-auth/react"
import { useEffect } from "react"

const IDLE_TIMEOUT = 60 * 60 * 1000 // 1 hour in milliseconds
// 10 second timer for testing
// const IDLE_TIMEOUT = 10 * 1000 // 10 seconds in milliseconds

export default function InactivityTracker() {
  useEffect(() => {
    let inactivityTimer

    const resetTimer = () => {
      clearTimeout(inactivityTimer)
      inactivityTimer = setTimeout(logout, IDLE_TIMEOUT)
    }

    const logout = () => {
      signOut({ callbackUrl: "/login" })
    }

    // Track user activity
    const events = ["mousemove", "keydown", "scroll", "click"]
    events.forEach((event) => window.addEventListener(event, resetTimer))

    // Start initial timer
    resetTimer()

    return () => {
      clearTimeout(inactivityTimer)
      events.forEach((event) => window.removeEventListener(event, resetTimer))
    }
  }, [])

  return null
}
