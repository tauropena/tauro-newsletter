import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials.password === process.env.BLOG_PASSWORD) {
          return { id: "1", name: "Welcome Reader :-)" }
        }
        throw new Error("WRONG. Try again.")
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
}

// This is the default export for NextAuth.js
// It is used to handle authentication requests in the Next.js API routes.
// The `authOptions` object is passed to NextAuth to configure the authentication providers and options
// The `handlers`, `auth`, `signIn`, and `signOut` are exported
// to be used in the Next.js application for handling authentication flows.
export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
