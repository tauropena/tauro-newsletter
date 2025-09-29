"use client"

import AuthProvider from "@/providers/SessionProvider"
import { Inter } from "next/font/google"
import "./globals.css"
import InactivityTracker from "@/components/InactivityTracker"


const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="512x512" />
       
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
