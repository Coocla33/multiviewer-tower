// apollo.config.js
module.exports = {
    client: {
        service: {
            name: "mutliviewer-tower",
            // URL to the GraphQL API
            url: "http://localhost:10101/api/graphql",
        },
        // Files processed by the extension
        includes: ["src/**/*.vue", "src/**/*.js", "src/**/*.ts"],
    },
};
