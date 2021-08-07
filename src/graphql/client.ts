import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.hashnode.com/",
  cache: new InMemoryCache({
    typePolicies: {
      Publication: {
        fields: {
          posts: {
            keyArgs: ["title"],
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});

export default client;
