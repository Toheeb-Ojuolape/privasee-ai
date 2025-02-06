import { prop, index } from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import mongoose from "mongoose";

@ObjectType()
@index({ question: 'text', description: 'text' })
export class Question {
  @Field(() => ID)
  @prop({ required: false, default: () => new mongoose.Types.ObjectId() })
  _id!: mongoose.Types.ObjectId;

  @Field()
  @prop({ required: true })
  question: string = "";

  @Field()
  @prop({ required: true })
  description: string = "";

  @Field()
  @prop({ required: true })
  email: string = "";

  @Field({ nullable: true })
  @prop()
  answer?: string;

  @Field({ nullable: true })
  @prop()
  updatedByEmail?: string;

  @Field(() => Date)
  @prop({ default: () => new Date() })
  createdAt: Date = new Date();

  @Field(() => Date)
  @prop({ default: () => new Date() })
  updatedAt: Date = new Date();
}
