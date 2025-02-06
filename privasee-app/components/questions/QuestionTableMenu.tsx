import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisIcon } from "lucide-react"
import { useRouter } from 'next/navigation';
import { toast } from "react-hot-toast"

export function QuestionTableMenu({ question, deleteQuestion }) {
    const router = useRouter()

    function handleView() {
        router.push(`/dashboard/questions/${question._id}`)
    }

    async function handleDeleteQuestion() {
        await toast.promise(
            deleteQuestion(question._id),
            {
                loading: 'Deleting question...',
                success: () => `Question deleted successfully`,
                error: (err) => `Something went wrong: ${err.toString()}`,
            },
            {
                success: {
                    duration: 6000,
                },
            }
        )
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"}> <EllipsisIcon /> </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-30">
                <DropdownMenuItem onClick={handleView}>
                    View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeleteQuestion}>
                    Delete
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}