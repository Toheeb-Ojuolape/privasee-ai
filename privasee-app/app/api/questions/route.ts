import { NextRequest, NextResponse } from "next/server";
import createApolloClient from "@/lib/apolloClient";
import { gql } from "@apollo/client";

const client = createApolloClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    const { data } = await client.query({
      query: gql`
        query GetFilteredQuestions($query: String!) {
          getAllQuestions(query: $query) {
            _id
            question
            answer
            email
            updatedAt
          }
        }
      `,
      variables: { query },
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.prompt) {
      const GENERATE_RESPONSE_QUERY = gql`
        query ($prompt: String!) {
          generateResponse(prompt: $prompt)
        }
      `;

      const { data } = await client.query({
        query: GENERATE_RESPONSE_QUERY,
        variables: { prompt: body.prompt },
      });

      return NextResponse.json({
        response: data.generateResponse,
      });
    } else if (body.email && body.ids) {
      const BULK_ASSIGN_QUESTIONS = gql`
        mutation ($email: String!, $ids: [String!]!) {
          bulkAssignQuestions(email: $email, ids: $ids) {
            _id
            email
            question
            answer
            createdAt
            updatedAt
          }
        }
      `;

      const { data } = await client.mutate({
        mutation: BULK_ASSIGN_QUESTIONS,
        variables: { email: body.email, ids: body.ids },
      });

      return NextResponse.json(data.bulkAssignQuestions);
    } else if (body.email && body.description && body.question) {
      const CREATE_QUESTION = gql`
        mutation ($email: String!, $description: String!, $question: String!) {
          createQuestion(
            email: $email
            description: $description
            question: $question
          ) {
            _id
            email
            question
            description
            createdAt
            updatedAt
          }
        }
      `;

      const { data } = await client.mutate({
        mutation: CREATE_QUESTION,
        variables: {
          email: body.email,
          description: body.description,
          question: body.question,
        },
      });

      return NextResponse.json(data.createQuestion);
    }

    return NextResponse.json(
      { error: "Invalid request payload" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    console.log("from server",id)
    if (!id) {
      return NextResponse.json(
        { error: "Question ID is required" },
        { status: 400 }
      );
    }

    const { data } = await client.mutate({
      mutation: gql`
        mutation ($deleteQuestionId: String!) {
          deleteQuestion(id: $deleteQuestionId)
        }
      `,
      variables: { deleteQuestionId: id },
    });

    return NextResponse.json({
      message: "Question deleted successfully",
      data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
