import React from 'react'
import { QuestionType } from '@/lib/types'
import { Clock, UserCircle } from 'lucide-react'
import { formatDate } from '@/utils/dateFormatter'

interface QuestionProps {
    question: QuestionType
}

const PropertiesSection: React.FC<QuestionProps> = ({ question }) => {
    return (
        <div>
            <h1 className="text-lg mb-3 font-bold">Properties</h1>
            <div className="space-y-3">
                <div className="flex flex-1 items-center space-x-2">
                    <UserCircle className="h-6 w-6" />
                    <span>{question.email.length > 19 ? `${question.email.slice(0,19)}...`: question.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>{formatDate(question.updatedAt)}</span>
                </div>
            </div>
        </div>
    )
}

export default PropertiesSection
