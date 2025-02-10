"use client";

import Image from "next/image";
import googleLogo from "@/public/google.png";
import githubLogo from "@/public/github.png";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast"
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormLabel, Form, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function GoogleSignInButton() {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)

    await toast.promise(
      signIn("google"),
      {
        loading: 'Loading',
        success: () => `Login successful!`,
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
        success: () => `Login successful!`,
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



export function SigninWithEmail() {

  const emailAuthSchema = z.object({
    email: z.string().email({ message: "Please select a valid email." }),
    name: z.string().min(5, "Please enter a valid name")
  })

  type emailFormData = z.infer<typeof emailAuthSchema>

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<emailFormData>({
    resolver: zodResolver(emailAuthSchema),
    defaultValues: {
      email: '',
      name: ''
    },
  })


  const onSubmit = async (formData: emailFormData) => {
    setIsLoading(true)
    await toast.promise(
      signIn("credentials", {
        email: formData.email,
        username: formData.name
      }),
      {
        loading: 'Loading',
        success: () => `Login successful`,
        error: (err) => `Something went wrong: ${err.toString()}`,
      },
      {
        success: {
          duration: 5000,
        },
      }
    )
    form.reset()
    setIsLoading(false)
  }

  return (
    <Form  {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <FormField control={form.control}
            name="name"
            render={({ field }) => (

              <FormItem>
                <FormLabel>Name</FormLabel>
                <Input {...field} />
              </FormItem>
            )} />

          <FormField control={form.control}
            name="email"
            render={({ field }) => (

              <FormItem>
                <FormLabel>Email address</FormLabel>
                <Input {...field} />
              </FormItem>
            )} />
          <Button className="my-5 w-full">
            {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

