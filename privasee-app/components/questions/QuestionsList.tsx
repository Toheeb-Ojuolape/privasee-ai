'use client'
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import SearchSection from "./SearchSection";
import { QuestionLoader } from "../loaders/QuestionLoader";

interface Question {
  _id: string;
  question: string;
  email: string | null;
}

interface QuestionsListProps {
  questions: Question[];
  selectQuestion: (id: string) => void;
  selectedIds: string[],
  selectQuestions: (checked: Boolean | string, id: string) => void,
  refreshQuestions: (query: string) => void
  addQuestion: (email: string, description: string, question: string) => Promise<void>
  loading: Boolean
}

function QuestionsList({ questions, selectQuestion, selectedIds, selectQuestions, refreshQuestions, addQuestion, loading }: QuestionsListProps) {
  const [search, setSearch] = useState("")

  return (
    <div>

      <SearchSection setSearch={setSearch} addQuestion={addQuestion} refreshQuestions={refreshQuestions} />

      {questions.length ? <ul className="my-5">
        {questions.map((q) => (
          <li key={q._id} className="flex my-4 p-2 border rounded">
            <Checkbox
              checked={selectedIds.includes(q._id)}
              onCheckedChange={(checked) => selectQuestions(checked, q._id)}
              id={q._id}
              className="m-3"
            />
            <div className="cursor-pointer" onClick={() => selectQuestion(q._id)}>
              <strong>{q.question}</strong>
              <p className="text-sm text-gray-500">Assigned to: {q.email || "Unassigned"}</p>
            </div>
          </li>
        ))}
      </ul> : search ? <p className="my-3">No results match your search</p> : <>

        {loading ? <>{Array.from({ length: 5 }).map((_, index) => (
          <QuestionLoader key={index} />
        ))}</> : <div className="text-center"></div>}
      </>}
    </div>
  );
}

export default QuestionsList;
