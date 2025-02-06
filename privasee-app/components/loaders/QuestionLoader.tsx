import { Skeleton } from "@/components/ui/skeleton"
 
export function QuestionLoader() {
  return (
    <div className="my-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}