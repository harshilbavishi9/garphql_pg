// indexfile.js
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { readFileSync } from "fs";
import { join } from "path";
import userResolver from "./resolvers/indexResolver";
import productResolver from "./resolvers/productResolver";
import './config/pg'

const app = express();
const port = 7500;

const userSchema = readFileSync(join(__dirname, 'graph', 'user.gql'), 'utf-8');
const productSchema = readFileSync(join(__dirname, 'graph', 'product.gql'), 'utf-8');

const server = new ApolloServer({
    typeDefs: [userSchema, productSchema],
    resolvers: [userResolver, productResolver],
});

async function startApolloServer() {
    await server.start();
    server.applyMiddleware({ app });

    app.listen(port, () => {
        console.log("Server is running on port", port);
        console.log(`GraphQL server ready at http://localhost:${port}${server.graphqlPath}`);
    });
}

startApolloServer();
