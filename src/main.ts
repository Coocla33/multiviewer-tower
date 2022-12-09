import { createApp, h, provide } from "vue";
import App from "./App.vue";
import {
    DefaultApolloClient,
    provideApolloClient,
} from "@vue/apollo-composable";

import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
} from "@apollo/client/core";

// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: "http://localhost:10101/api/graphql",
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
});

provideApolloClient(apolloClient);

createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient);
    },
    render: () => h(App),
}).mount("#app");
