import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Crendentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        const url = "https://fakestoreapi.com/auth/login";
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        };

        const response = await fetch(url, options);

        if (response.status === 200) {
          const token = await response.json();
          if (token !== null) {
            const user = { name: credentials.username, email: credentials.username };
            return user;
          } else {
            return null;
          }
        } else {
          const error = await response.text();
          console.error(error);
          return null;
        }
      },

    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, token, user }) {
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }
  },
};
