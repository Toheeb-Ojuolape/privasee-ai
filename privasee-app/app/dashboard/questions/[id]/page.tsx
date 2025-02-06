'use client';

import { useState } from 'react';
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { QuestionsProvider, useQuestions } from '@/context/questions-context';
import { Suspense } from 'react';
import { useEffect } from 'react';
import PropertiesSection from '@/components/questions/PropertiesSection';
import AnswerSection from '@/components/questions/AnswerSection';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


function SingleQuestionPage({ id }) {
    const { data } = useSession()
    const [isOpen, setIsOpen] = useState(true);
    const { question, selectQuestion, assignAnswer } = useQuestions()
    const router = useRouter()

    useEffect(() => {
        selectQuestion(id)
    }, [id])


    if (!question) {
        return <Card>
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        </Card>;
    }

    if (!id) {
        return <div>No questions found.</div>
    }

    return (
        <div className="flex gap-4 h-[calc(100vh-3rem)]">


            <div className={cn("transition-all duration-300 ease-in-out", isOpen ? 'w-3/4' : 'w-[95%]')}>
                <Card className="h-full flex flex-col">
                    <CardHeader className="flex-none">
                        <CardDescription className="text-center flex justify-between flex-row">
                            <Button onClick={()=>router.back()} size={"icon"} variant={"outline"}>
                                <ChevronLeft />
                            </Button>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto">
                        {question ? <AnswerSection assignAnswer={assignAnswer} question={question} email={data?.user?.email} /> : ""}
                    </CardContent>
                </Card>
            </div>
            <div
                className={cn("transition-all duration-300 ease-in-out flex sticky top-4 h-[calc(100vh-3rem)]", isOpen ? 'w-1/3' : 'w-12')}>
                <div className="relative flex w-full">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="absolute -left-3 top-4 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md"
                    >
                        {isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </button>

                    <Card
                        className={cn("w-full h-full transition-all duration-300",
                            isOpen ? 'opacity-100' : 'opacity-0 overflow-hidden'
                        )}
                    >
                        <CardContent className={cn("overflow-y-auto", isOpen ? 'block pt-4' : 'hidden pt-4')}>
                            <PropertiesSection question={question} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function SingleQuestionPageById({ params }: { params: { id: string } }) {
    const { id } = params;


    return (
        <QuestionsProvider>
            <Suspense>
                <SingleQuestionPage id={id} />
            </Suspense>
        </QuestionsProvider>
    )
}