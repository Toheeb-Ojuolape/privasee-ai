import { prop, getModelForClass } from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import mongoose from "mongoose";

@ObjectType()
export class User {
  @Field(() => ID)
  @prop({ required: false, default: () => new mongoose.Types.ObjectId() })
  _id!: mongoose.Types.ObjectId;

  @Field()
  @prop({ required: true })
  name: string = "";

  @Field()
  @prop({ required: true, unique: true })
  email: string = "";
}

export const UserModel = getModelForClass(User);
