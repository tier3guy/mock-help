import { UserRole } from "@/types/next-auth";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [    
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const data = await response.json();

          if (response.ok && data) {
            return {
              id: data.data.user.id,
              email: data.data.user.email,
              accessToken: data.data.accessToken,
              ...data.data.user
            }
          }
          throw new Error(data.message || 'Authentication failed');
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(error.message || 'Authentication failed');
          }
          throw new Error('Authentication failed');
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/google-auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              googleId: user.id,
            }),
          });
          
          const data = await response.json();
          if (response.ok) {
            user.accessToken = data.data.accessToken;
            user.role = data.data.user.role;
            user.permissions = data.data.user.permissions;
            return true;
          }
          return false;
        } catch (error) {
          console.error("Google auth error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user && account) {
        token.accessToken = user.accessToken;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (!token.accessToken || !token.user) {
        console.warn("Warning: Access token or user information is missing in the session.");
      }
      session.accessToken = token.accessToken as string;
      session.user = token.user as {
        id: string;
        name: string;
        email: string;
        role: UserRole;
        permissions: Record<string, unknown>;
        createdAt: string;
        updatedAt: string;
      };
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
})

export { handler as GET, handler as POST } 