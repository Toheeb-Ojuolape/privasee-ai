import { QuestionTableMenu } from '@/components/questions/QuestionTableMenu';
import { Checkbox } from '@/components/ui/checkbox';
import { TableCell, TableRow } from '@/components/ui/table';
import { QuestionType } from "@/lib/types"
import { formatDate } from '@/utils/dateFormatter';

interface QuestionItemProps {
    question: QuestionType;
    selectedIds: string[];
    selectQuestions: (checked: Boolean | string, questionId: string) => void
    deleteQuestion: (id: string) => Promise<void>
}

export function QuestionItem({ question, selectedIds, selectQuestions, deleteQuestion }: QuestionItemProps) {
    return (
        <TableRow>
            <TableCell><Checkbox
                checked={selectedIds.includes(question._id)}
                onCheckedChange={(checked) => selectQuestions(checked, question._id)}
                id={question._id}
                className="m-3"
            /></TableCell>
            <TableCell className="font-medium w-1/6">{question.question}</TableCell>
            <TableCell className="hidden md:table-cell w-2/6">{question.answer}</TableCell>
            <TableCell>{question.email}</TableCell>
            <TableCell className="font-medium w-1/6">{formatDate(question.createdAt)}</TableCell>

            <TableCell>
                <QuestionTableMenu question={question} deleteQuestion={deleteQuestion} />
            </TableCell>
        </TableRow>
    );
}
