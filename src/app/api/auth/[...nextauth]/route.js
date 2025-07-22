import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.password) {
            return null
          }

          if (credentials.password !== process.env.BLOG_PASSWORD) {
            throw new Error(" -- password is case sensitive")
          }

          return {
            id: "1",
            name: "welcome reader :-)", // This appears in session.user.name
            tabId: Math.random().toString(36).slice(2), // Generate unique tab ID
          }
        } catch (error) {
          throw new Error("WRONG" + error.message)
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days session duration
  },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.user = user
        token.tabId = user.tabId // Preserve tabId from authorize
      }
      // Subsequent requests
      else if (!token.tabId) {
        // Generate tabId if missing (backward compatibility)
        token.tabId = Math.random().toString(36).slice(2)
      }

      return token
    },
    async session({ session, token }) {
      session.user = token.user || {}
      session.tabId = token.tabId // Make tabId available client-side
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url
      return baseUrl + "/home"
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/home",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60, // 30 days (matches session maxAge)
      },
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
export const { auth, signIn, signOut } = NextAuth(authOptions)

// This is the default export for NextAuth.js
// It is used to handle authentication requests in the Next.js API routes.
// The `authOptions` object is passed to NextAuth to configure the authentication providers and options
// The `handlers`, `auth`, `signIn`, and `signOut` are exported
// to be used in the Next.js application for handling authentication flows.
