import { NextRequest, NextResponse } from "next/server";
import createApolloClient from "@/lib/apolloClient";
import { gql } from "@apollo/client";

const client = createApolloClient();

export async function GET(request: NextRequest) {
  try {
    const { data } = await client.query({
      query: gql`
        query {
          users {
            _id
            name
            email
          }
        }
      `,
    });

    return NextResponse.json(data);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const CREATE_USER = gql`
      mutation ($email: String!, $name: String!) {
        createUser(email: $email, name: $name) {
          _id
          email
          name
        }
      }
    `;

    const { data } = await client.mutate({
      mutation: CREATE_USER,
      variables: { email: body.email, name: body.name },
    });

    return NextResponse.json(data.createUser);
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
