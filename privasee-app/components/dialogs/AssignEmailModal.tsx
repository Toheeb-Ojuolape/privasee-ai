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
    FormDescription
} from '@/components/ui/form'
import { Button } from "@/components/ui/button"
import React from 'react'
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus2Icon } from "lucide-react"
import { Loader2 } from "lucide-react"
import { toast } from "react-hot-toast"
import { useUsers } from "@/context/users-context"



const questionSchema = z.object({
    email: z.string().email({ message: "Please select a valid email." }),
})

type QuestionFormData = z.infer<typeof questionSchema>

export default function AssignEmailModal({ selectedIds, bulkAssignQuestions, resetSelectedIds, refreshQuestions }) {
    const { data } = useSession()
    const { users } = useUsers()

    const form = useForm<QuestionFormData>({
        resolver: zodResolver(questionSchema),
        defaultValues: {
            email: '',

        },
    })

    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const onSubmit = async (formData: QuestionFormData) => {

        setIsLoading(true)
        await toast.promise(
            bulkAssignQuestions(formData.email, selectedIds),
            {
                loading: 'Loading',
                success: () => `Questions re-assigned successfully`,
                error: (err) => `Something went wrong: ${err.toString()}`,
            },
            {
                success: {
                    duration: 5000,
                },
            }
        )
        await refreshQuestions()
        resetSelectedIds()
        setIsLoading(false)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full"><UserPlus2Icon /> Assign to User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Bulk Assign to User</DialogTitle>
                    <DialogDescription>
                        Select the user you would like to reassign these questions to:
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                        <div className="grid gap-4 py-4">
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
                                            {form.getValues().email ? "" : <>Default assign to: <strong>{data?.user?.email}</strong></>}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <Button disabled={isLoading} type="submit">
                                {isLoading ? <Loader2 className="animate-spin"/> : "Submit"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
