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
            name: "welcome reader :-)", // where does this message show up if at all?
          }
        } catch (error) {
          throw new Error("WRONG" + error.message)
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      session.user = token.user || {}
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
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

// This is the default export for NextAuth.js
// It is used to handle authentication requests in the Next.js API routes.
// The `authOptions` object is passed to NextAuth to configure the authentication providers and options
// The `handlers`, `auth`, `signIn`, and `signOut` are exported
// to be used in the Next.js application for handling authentication flows.
export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
