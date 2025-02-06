import { NextRequest, NextResponse } from "next/server";
import createApolloClient from "@/lib/apolloClient";
import { gql } from "@apollo/client";

const client = createApolloClient();


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const GET_QUESTION = gql`
        query ($getQuestionId: String!) {
            getQuestion(id: $getQuestionId) {
                _id
                question
                answer
                description
                email
                createdAt
                updatedAt
                updatedByEmail
            }
        }
    `;

    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json({ error: "Question ID is required" }, { status: 400 });
        }

        const { data } = await client.query({
            query: GET_QUESTION,
            variables: { getQuestionId: id },
        });

        if (!data.getQuestion) {
            return NextResponse.json({ error: "Question not found" }, { status: 404 });
        }

        return NextResponse.json(data.getQuestion);
    } catch (error: any) {
        console.error("Error fetching question:", error);
        return NextResponse.json({ error: "Failed to fetch question" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const ADD_ANSWER = gql`
        mutation ($answer: String!, $addAnswerId: String!, $email: String!) {
            addAnswer(answer: $answer, id: $addAnswerId, email: $email) {
                _id
                question
                answer
                description
                email
                updatedAt
                updatedByEmail
            }
        }
    `;

    try {
        const { id } = params;
        const { answer, email } = await request.json();

        if (!id || !answer) {
            return NextResponse.json({ error: "Question ID and answer are required" }, { status: 400 });
        }

        const { data } = await client.mutate({
            mutation: ADD_ANSWER,
            variables: { answer, addAnswerId: id, email },
        });

        return NextResponse.json(data.addAnswer);
    } catch (error: any) {
        console.error("Error updating answer:", error);
        return NextResponse.json({ error: "Failed to update answer" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const ASSIGN_EMAIL = gql`
        mutation ($id: String!, $email: String!) {
            assignEmail(id: $id, email: $email) {
                _id
                question
                answer
                description
                email
                updatedAt
                updatedByEmail
            }
        }
    `;

    try {
        const { id } = params;
        const { email } = await request.json();

        if (!id || !email) {
            return NextResponse.json({ error: "Question ID and email are required" }, { status: 400 });
        }

        const { data } = await client.mutate({
            mutation: ASSIGN_EMAIL,
            variables: { id, email },
        });

        return NextResponse.json(data.assignEmail);
    } catch (error: any) {
        console.error("Error assigning email:", error);
        return NextResponse.json({ error: "Failed to assign email" }, { status: 500 });
    }
}
