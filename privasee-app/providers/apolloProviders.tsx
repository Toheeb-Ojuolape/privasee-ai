"use client";

import { ApolloProvider } from "@apollo/client";
import createApolloClient from "@/lib/apolloClient"; 

const client = createApolloClient();

export function ApolloProviders({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}