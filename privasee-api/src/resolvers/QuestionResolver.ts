import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Question } from "../models/Question";
import { getModelForClass } from "@typegoose/typegoose";

const QuestionModel = getModelForClass(Question);

@Resolver(Question)
export class QuestionResolver {
  @Mutation(() => Question)
  async createQuestion(
    @Arg("question") question: string,
    @Arg("description") description: string,
    @Arg("email") email: string
  ): Promise<Question> {
    const questionData = await QuestionModel.create({
      question,
      description,
      email,
    });
    return questionData;
  }

  @Mutation(() => Question)
  async addAnswer(
    @Arg("id") id: string,
    @Arg("email") email: string,
    @Arg("answer") answer: string
  ): Promise<Question | null> {
    const question = await QuestionModel.findById(id);
    if (!question) throw new Error("Question not found");

    question.email = email;
    question.updatedByEmail = email;
    question.answer = answer;
    question.updatedAt = new Date();
    await question.save();

    return question;
  }

  @Mutation(() => Question)
  async assignQuestion(
    @Arg("id") id: string,
    @Arg("email") email: string
  ): Promise<Question | null> {
    const question = await QuestionModel.findById(id);
    if (!question) throw new Error("Question not found");

    question.email = email;
    question.updatedAt = new Date();
    await question.save();

    return question;
  }

  @Mutation(() => [Question])
  async bulkAssignQuestions(
    @Arg("ids", () => [String]) ids: string[],
    @Arg("email") email: string
  ): Promise<Question[]> {
    const questions = await QuestionModel.find({ _id: { $in: ids } });

    if (!questions.length) throw new Error("No questions found");

    for (const question of questions) {
      question.email = email;
      question.updatedAt = new Date();
      await question.save();
    }

    return questions;
  }

  @Query(() => [Question])
  async getAllQuestions(@Arg("query") query: string): Promise<Question[]> {
    const regexQuery = new RegExp(query, 'i');

    const questions = await QuestionModel.find({
      $or: [
        { question: { $regex: regexQuery } },
        { description: { $regex: regexQuery } },
      ],
    }).exec();

    return questions;
  }


  @Query(() => Question, { nullable: true })
  async getQuestion(@Arg("id") id: string): Promise<Question | null> {
    return await QuestionModel.findById(id);
  }

  @Mutation(() => Boolean)
  async deleteQuestion(@Arg("id") id: string): Promise<boolean> {
    const deleted = await QuestionModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new Error("Question not found");
    }
    return true;
  }
}
