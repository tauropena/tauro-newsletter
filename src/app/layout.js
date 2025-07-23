"use client"

import AuthProvider from "@/providers/SessionProvider"
import { Inter } from "next/font/google"
import "./globals.css"
import InactivityTracker from "@/components/InactivityTracker"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="512x512" />
        <Script
          id="mailchimp"
          src="https://chimpstatic.com/mcjs-connected/js/users/f194f459e5195f688bebd9c64/0d11c910d3ec9fb2ac0a5b153.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <InactivityTracker />
        </AuthProvider>
      </body>
    </html>
  )
}
// This is the root layout for the Next.js application.
// It imports the `SessionProvider` to manage user authentication sessions.
// The `Inter` font is imported from Google Fonts and applied to the body.
// The `globals.css` file is imported for global styles.
// The `RootLayout` component wraps the application in an HTML structure with a language attribute set to "en" (English).
// The `children` prop allows the layout to render nested components
// within the body, providing a consistent layout across the application.
