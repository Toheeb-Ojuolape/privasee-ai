"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { toast } from "react-hot-toast"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'

const questionSchema = z.object({
    question: z.string().min(5, "Question title must be at least 5 characters long"),
    description: z.string().min(30, "Description must be at least 30 characters long"),
})

type QuestionFormData = z.infer<typeof questionSchema>

interface AddQuestionProps {
    addQuestion: (email: string, description: string, question: string) => Promise<void>;
    children: React.ReactNode
}

export default function AddQuestion({ addQuestion, children }: AddQuestionProps) {
    const { data } = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const form = useForm<QuestionFormData>({
        resolver: zodResolver(questionSchema),
        defaultValues: {
            question: '',
            description: '',
        },
    })

    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const onSubmit = async (formData: QuestionFormData) => {
        setIsLoading(true)
        await toast.promise(
            addQuestion(data?.user?.email!, formData.description, formData.question),
            {
                loading: 'Loading',
                success: () => `Question created successfully`,
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
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div onClick={() => setIsOpen(true)}>{children}</div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Add a Question</DialogTitle>
                    <DialogDescription>
                        Enter your question&apos;s details below:
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                        <div className="grid gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="question"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <Button disabled={isLoading} type="submit">
                                {isLoading ? <Loader2 className="animate-spin" /> : "Submit"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
