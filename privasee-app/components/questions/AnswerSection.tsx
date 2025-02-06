"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import { FaMagic } from "react-icons/fa"
import { Loader2 } from "lucide-react"
import { useUsers } from "@/context/users-context"
import { useQuestions } from "@/context/questions-context"

const FormSchema = z.object({
  answer: z.string().min(10, { message: "Answer must be at least 10 characters." }),
  email: z.string().email({ message: "Please select a valid email." }),
})

export default function AnswerSection({ question, email, assignAnswer }) {
  const [isLoading, setIsLoading] = useState(false)
  const [IsGeneratingResponse, setIsGeneratingResponse] = useState(false)
  const { users } = useUsers()
  const { generateAIResponse } = useQuestions()



  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      answer: question.answer ? question.answer : "",
      email: question.email,
    },
  })

  useEffect(() => {
    form.setValue("answer", question.answer ? question.answer : "")
  }, [form, question])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true)
    await toast.promise(
      assignAnswer(question._id, data.answer, data.email ? data.email : email),
      {
        loading: 'Loading...',
        success: () => `Question updated successfully`,
        error: (err) => `Something went wrong: ${err.toString()}`,
      },
      {
        success: {
          duration: 6000,
        },
      }
    )
    setIsLoading(false)
  }

  async function handleGenerateResponse(question, description) {
    try {
      setIsGeneratingResponse(true)
      const airesponse: any = await toast.promise(
        generateAIResponse(question, description),
        {
          loading: 'Generating AI response...',
          success: () => "Response generated successfully",
          error: (err) => `Something went wrong: ${err.toString()}`,
        },
        {
          success: {
            duration: 6000,
          },
        }
      )

      setIsGeneratingResponse(false)

      const words = airesponse.response.split(" ");
      let currentText = "";
      for (let i = 0; i < words.length; i++) {
        currentText += words[i] + " ";
        form.setValue("answer", currentText.trim());
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

    } catch (error: any) {
      toast.error(`Something went wrong ${error.message}`)
      setIsGeneratingResponse(false)
    }
  }

  return (
    <Form {...form}>
      <div className="my-3">
        <h2>Question:</h2>
        <FormLabel className="text-xl font-bold">{question.question}</FormLabel>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer</FormLabel>
              <FormControl>
                <Textarea placeholder="Write your answer here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="button" onClick={() => handleGenerateResponse(question.question, question.description)} variant={"outline"}>{IsGeneratingResponse ? <Loader2 className="animate-spin" /> : <>Generate AI Response <FaMagic /></>}</Button>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assign to</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user._id} value={user.email}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                {form.getValues().email ? "" : <>Default assign to: <strong>{email}</strong></>}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={isLoading} type="submit">{isLoading ? <Loader2 className="animate-spin" /> : "Submit"}</Button>
      </form>
    </Form>
  )
}
