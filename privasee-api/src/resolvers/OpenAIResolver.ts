import { Resolver, Query, Arg } from "type-graphql";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

@Resolver()
export class OpenAIResolver {
  @Query(() => String)
  async generateResponse(@Arg("prompt") prompt: string): Promise<string> {
    try {
      const client = new OpenAI({
        apiKey: process.env["OPENAI_API_KEY"],
      });

      const response = await client.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
        stream: true,
      });

      const stream = response;
      let fullResponse = "";

      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content;
        if (text) {
          fullResponse += text;
        }
      }

      return fullResponse;
    } catch (error) {
      console.error("Error generating response:", error);
      throw new Error("Failed to generate response from OpenAI.");
    }
  }
}
