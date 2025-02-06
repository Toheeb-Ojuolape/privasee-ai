import "./globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "@/providers/authProviders";
import { ApolloProviders } from "@/providers/apolloProviders";
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Privasee App",
  description: "An app for Privasee Q/A management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " flex flex-row"}>
        <NextAuthProvider>
          <ApolloProviders>
            <Toaster position={"top-right"} toastOptions={{
              duration: 5000
            }} />
            {children}
          </ApolloProviders>

        </NextAuthProvider>
      </body>
    </html>
  );
}
