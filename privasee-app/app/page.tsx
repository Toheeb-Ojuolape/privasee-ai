
import {
  GithubSignInButton,
  GoogleSignInButton,
} from "@/components/authButtons";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function SignInPage() {
  const session = await getServerSession(authConfig);

  if (session) return redirect("/dashboard");

  return (
    <div className="w-full flex items-center justify-center min-h-screen">
      <div className="rounded-xl flex flex-col items-center mt-10 pt-5 pb-12 px-24 shadow-lg border">
        <h1 className="mt-10 mb-4 text-4xl font-bold">Welcome to Privasee AI</h1>
        <p>Login with any of the options below:</p>
        <GoogleSignInButton />
        <GithubSignInButton />
      </div>
    </div>
  );
}
