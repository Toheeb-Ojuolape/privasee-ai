"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { QuestionType } from "@/lib/types";
import { toast } from "react-hot-toast";

interface QuestionsContextType {
  questions: QuestionType[];
  question: QuestionType | null;
  loading: Boolean;
  setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
  selectQuestion: (id: string) => Promise<void>,
  refreshQuestions: (query: string) => Promise<void>,
  addQuestion: (email: string, description: string, question: string) => Promise<void>;
  bulkAssignQuestions: (email: string, ids: string[]) => Promise<void>;
  assignAnswer: (id: string, answer: string, email: string) => Promise<void>;
  generateAIResponse: (question: string, description: string) => Promise<void>
  deleteQuestion: (id: string) => Promise<void>
}

const QuestionContext = createContext<QuestionsContextType | undefined>(undefined);

export const useQuestions = () => {
  const context = useContext(QuestionContext);
  if (!context) {
    throw new Error("useQuestions must be used within a QuestionsProvider");
  }
  return context;
};

export const QuestionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [question, setQuestion] = useState<QuestionType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/questions");
        if (!response.ok) throw new Error("Failed to fetch questions");
        const data = await response.json();
        setQuestions(data.getAllQuestions);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false)
      }
    };

    fetchQuestions();
  }, [setQuestions]);



  const addQuestion = async (email: string, description: string, question: string) => {
    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, description, question }),
      });

      if (!response.ok) {
        toast.error("Failed to create question")
        throw new Error("Failed to create question");
      }

      const newQuestion = await response.json();
      setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
      toast
    } catch (error: any) {
      toast.error(`Error adding question: ${error?.message}`);
    }
  };


  const generateAIResponse = async (question: string, description: string) => {
    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: `You're a helpful AI assistant. Please generate a short response to the question ${question} with description ${description}` }),
      });

      if (!response.ok) {
        toast.error("Failed to create question")
        throw new Error("Failed to create question");
      }

      const answer = await response.json();
      return answer
    } catch (error: any) {
      toast.error(`Error adding question: ${error?.message}`);
    }
  };


  const refreshQuestions = useCallback(async (query: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/questions?query=${query ? query : ''}`)
      if (!response.ok) {
        throw new Error('Failed to fetch questions')
      }
      const data = await response.json()
      setQuestions(data.getAllQuestions)
      setLoading(false)
    } catch (error) {
      console.error("Error refreshing questions:", error)
      setLoading(false)
    }
  }, [])


  const bulkAssignQuestions = async (email: string, ids: string[]) => {
    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ids }),
      });

      if (!response.ok) {
        toast.error("Failed to create question")
        throw new Error("Failed to create question");
      }

      const newQuestion = await response.json();
      console.log(newQuestion)
    } catch (error: any) {
      toast.error(`Error adding question: ${error?.message}`);
    }
  };

  const selectQuestion = async (id: string) => {
    if (!id) return;

    try {
      setLoading(true)
      const response = await fetch(`/api/questions/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch question");
      }

      const questionData = await response.json();
      setQuestion(questionData)
      setLoading(false)
    } catch (error) {
      console.error("Error selecting question:", error);
      toast.error("Failed to load question details.");
      setLoading(false)
    }
  }

  async function deleteQuestion(id: string) {
    try {
      const response = await fetch(`/api/questions?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to delete question");

      console.log("Question deleted successfully");
      refreshQuestions("");
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  }


  const assignAnswer = async (id: string, answer: string, email: string) => {
    if (!id || !answer || !email) {
      toast.error("Question ID, answer, and email are required.");
      return;
    }

    try {
      const response = await fetch(`/api/questions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer, email }),
      });

      if (!response.ok) {
        throw new Error("Failed to assign answer");
      }

      const updatedQuestion = await response.json();

      setQuestions((prevQuestions) =>
        prevQuestions.map((q) => (q._id === id ? updatedQuestion : q))
      );
      setQuestion(updatedQuestion);
    } catch (error) {
      console.error("Error assigning answer:", error);
      toast.error("Failed to assign answer.");
    }
  };

  return (
    <QuestionContext.Provider value={{ question, questions, loading, setQuestions, addQuestion, refreshQuestions, selectQuestion, assignAnswer, bulkAssignQuestions, generateAIResponse, deleteQuestion }}>
      {children}
    </QuestionContext.Provider>
  );
};
