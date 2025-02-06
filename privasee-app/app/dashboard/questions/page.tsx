'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Suspense, useState } from 'react';
import { QuestionItem } from "./question-item"
import { QuestionsProvider, useQuestions } from '@/context/questions-context';
import SearchSection from '@/components/questions/SearchSection';
import AssignEmailModal from '@/components/dialogs/AssignEmailModal';
import LoaderComponent from '@/components/loaders/LoaderComponent';


function QuestionPage() {
  const { questions, addQuestion, loading, refreshQuestions, bulkAssignQuestions, deleteQuestion } = useQuestions();
  const [search, setSearch] = useState("")
  const [selectedIds, setSelectedIds] = useState<string[]>([]);


  const selectQuestions = (checked: Boolean | string, questionId: string) => {
    setSelectedIds((prevIds) => {
      if (checked) {
        return [...prevIds, questionId];
      } else {
        return prevIds.filter((id) => id !== questionId);
      }
    });
  }

  return (
    <Card className='h-1/2'>
      <CardHeader>
        <CardTitle>Questions</CardTitle>
        <CardDescription></CardDescription>

      </CardHeader>
      <CardContent>

        <div className="grid md:grid-cols-6 gap-4 items-center">
          <div className="col-span-5">
            <SearchSection setSearch={setSearch} addQuestion={addQuestion} refreshQuestions={refreshQuestions} />
          </div>

          {selectedIds.length > 0 && (
            <div className="col-span-1">
              <AssignEmailModal
                refreshQuestions={refreshQuestions}
                resetSelectedIds={() => setSelectedIds([])}
                bulkAssignQuestions={bulkAssignQuestions}
                selectedIds={selectedIds}
              />
            </div>
          )}
        </div>

        {!questions.length && loading ? (
          <LoaderComponent />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden md:table-cell"></TableHead>
                <TableHead className="hidden md:table-cell">Question</TableHead>
                <TableHead>Answer</TableHead>
                <TableHead>Assigned to</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions.map((question, i) => (
                <QuestionItem
                  key={i}
                  question={question}
                  selectedIds={selectedIds}
                  selectQuestions={selectQuestions}
                  deleteQuestion={deleteQuestion}
                />
              ))}
            </TableBody>
          </Table>
        )}

      </CardContent>
    </Card>
  );
}

export default function QuestionsPage() {
  return (
    <QuestionsProvider>
      <Suspense>
        <QuestionPage />
      </Suspense>
    </QuestionsProvider>
  );
}
