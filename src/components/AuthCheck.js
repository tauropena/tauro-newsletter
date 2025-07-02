"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function AuthCheck({ children }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }

  return children
}

// I need to better understand the logic for this page and what it's doing.
// My ideal scenario is that users click on my link to the newsletter,
// they are prompted to enter a password, and then they can read the newsletter.
// There's just one password for everyone, so I don't need to store user data..
// I also need to verify that this is the best way to do this.
// I also want to set up the app so that there's no sign out button.
// I just want users to be able to read the newsletter once they enter the password.
// But for security reasons, I WANT THE PAGE TO SIGN OUT AUTOMATICALLY WHEN THE PAGE RELOADS.
// I think this is what this page is doing, but I need to verify that

// TEST AND IMPROVE THE VIBES FOR THE LOADING PAGE
