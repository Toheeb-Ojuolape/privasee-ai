import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: `${process.env.API_URL}/graphql`,
    }),
    cache: new InMemoryCache({resultCaching: false}),
    defaultOptions: {
      query: {
        fetchPolicy: "no-cache",
      },
    },
  });
};

export default createApolloClient;
