"use client";

import Image from "next/image";
import googleLogo from "@/public/google.png";
import githubLogo from "@/public/github.png";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast"
import { Loader2 } from "lucide-react";

export function GoogleSignInButton() {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)

    await toast.promise(
      signIn("google"),
      {
        loading: 'Loading',
        success: () => `Logout successful!`,
        error: (err) => `Something went wrong: ${err.toString()}`,
      },
      {
        success: {
          duration: 5000,
        },
      }
    )
    setLoading(true)
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl  transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >


      {loading ? <Loader2 className="animate-spin" /> : <> <Image src={googleLogo} alt="Google Logo" width={20} height={20} /><span className="ml-4">Continue with Google</span></>}
    </button>
  );
}

export function GithubSignInButton() {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)

    await toast.promise(
      signIn("github"),
      {
        loading: 'Loading',
        success: () => `Logout successful!`,
        error: (err) => `Something went wrong: ${err.toString()}`,
      },
      {
        success: {
          duration: 5000,
        },
      }
    )
    setLoading(true)
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      {
        loading ? <Loader2 className="animate-spin" /> :
          <>
            <Image src={githubLogo} alt="Github Logo" width={20} height={20} />
            <span className="ml-4">Continue with Github</span>
          </>
      }
    </button>
  );
}

