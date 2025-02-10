
import {
  GithubSignInButton,
  GoogleSignInButton,
  SigninWithEmail,
} from "@/components/authButtons";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SelectSeparator } from "@/components/ui/select";


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

       
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">or</span>
        </div>
      

        <SigninWithEmail />
      </div>
    </div>
  );
}
