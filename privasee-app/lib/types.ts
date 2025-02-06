export interface QuestionType {
  _id: string;
  question: string;
  answer: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  updatedByEmail: string;
}

export interface UserType {
  _id: string;
  name: string;
  email: string;
}
