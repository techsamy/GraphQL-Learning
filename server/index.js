const express = require("express");
const {ApolloServer} = require("@apollo/server");
const {expressMiddleware} = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");

async function startServer(){
    const app = express();
    const server = new ApolloServer({
         typeDefs: `
            type Todo {
                id: ID!
                title: String!
                completed: Boolean
            }

            type Query {
                getTodos: [Todo]
            }
        `,
        resolvers: {
           /*  Query: {
                hello: () => "Hello world!"
            } */
        }
    });

    app.use(bodyParser.json());
    app.use(cors());

    await server.start();

    // app.use("/graphql", expressMiddleware(server));
    app.use("/graphql", expressMiddleware(server, {
        context: ({ req }) => ({ req }),
    }));

    app.listen(8000, () => {
        console.log("Server is running on http://localhost:8000/graphql");
    });
}

startServer().catch(err => {
    console.error("Failed to start server:", err);
    process.exit(1);
});