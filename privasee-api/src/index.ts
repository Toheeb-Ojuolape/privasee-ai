import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { UserResolver } from "./resolvers/UserResolver";
import { QuestionResolver } from "./resolvers/QuestionResolver";
import { OpenAIResolver } from "./resolvers/OpenAIResolver";

dotenv.config();

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI as string, {
      dbName: "graphql",
    });
    console.log("🚀 Connected to MongoDB");

    const schema = await buildSchema({
      resolvers: [UserResolver, QuestionResolver, OpenAIResolver],
    });

    const server = new ApolloServer({ schema });

    server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
      console.log(`🚀 Server running at ${url}`);
    });
  } catch (error) {
    console.error("Error starting server", error);
  }
};

startServer();
