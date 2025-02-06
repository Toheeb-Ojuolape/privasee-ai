"use client"
import AnswerSection from "@/components/questions/AnswerSection";
import QuestionsList from "@/components/questions/QuestionsList";
import { Suspense } from "react";
import { QuestionsProvider, useQuestions } from "@/context/questions-context";
import { useSession } from "next-auth/react";
import AddQuestionModal from "@/components/dialogs/AddQuestionModal";
import NoAnswer from "@/components/questions/NoAnswer";
import PropertiesSection from "@/components/questions/PropertiesSection";
import { useState } from "react";
import AssignEmailModal from "@/components/dialogs/AssignEmailModal";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";



function Dashboard() {
  const { data } = useSession()
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { questions, addQuestion, loading, selectQuestion, question, assignAnswer, bulkAssignQuestions, refreshQuestions } = useQuestions()

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
    <div className="px-5">
      <div className="flex justify-between mt-3 mb-6">
        <h1 className="mt-10 mb-4 text-4xl font-bold"> Hello,  {data?.user?.name} 👋</h1>
        <div className="mt-8">
          <AddQuestionModal addQuestion={addQuestion}>
            <Button><PlusCircle /> Add Question</Button>
          </AddQuestionModal>
        </div>
      </div>
      <div className="w-full p-2">
        <div className="grid lg:grid-cols-12 gap-4">
          <div className="p-6 rounded-lg shadow-md lg:col-span-4">
            <QuestionsList loading={loading} addQuestion={addQuestion} refreshQuestions={refreshQuestions} selectedIds={selectedIds} selectQuestions={selectQuestions} questions={questions} selectQuestion={selectQuestion} />
            {selectedIds.length ? <AssignEmailModal refreshQuestions={refreshQuestions} resetSelectedIds={() => setSelectedIds([])} bulkAssignQuestions={bulkAssignQuestions} selectedIds={selectedIds} /> : ""}
          </div>
          <div className="px-6 pt-4 pb-8 rounded-lg shadow-md lg:col-span-5">
            {question ? <AnswerSection assignAnswer={assignAnswer} question={question} email={data?.user?.email} /> : <NoAnswer />}
          </div>
          <div className="p-6 rounded-lg shadow-md lg:col-span-3">
            {
              question ? <PropertiesSection question={question} /> : <></>
            }

          </div>
        </div>
      </div>
    </div>
  )
}



export default async function Page() {
  return (
    <QuestionsProvider>
      <Suspense>
        <Dashboard />
      </Suspense>
    </QuestionsProvider>
  );
}
