import { NextAuthOptions, getServerSession } from "next-auth";
import { redirect, useRouter } from "next/navigation";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { gql } from "@apollo/client";
import createApolloClient from "./apolloClient";

const client = createApolloClient();

const router = useRouter

const CREATE_USER = gql`
  mutation ($email: String!, $name: String!) {
    createUser(email: $email, name: $name) {
      _id
      email
      name
    }
  }
`;

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const { email, name } = user;

        await client.mutate({
          mutation: CREATE_USER,
          variables: { email: email, name: name },
        });

        return true;
      } catch (error) {
        console.error("Error creating user:", error);
        return false;
      }
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  if (!session) return redirect("/");
}
