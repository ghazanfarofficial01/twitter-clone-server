import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors'
import express from 'express';
import bodyParser from 'body-parser';
import { prismaClient } from '../client/db';
import { User } from './user/index';
import { GraphqlContext } from '../interfaces';
import JWTSevice from '../services/jwt';

export async function initServer() {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());


    const graphqlServer = new ApolloServer<GraphqlContext>({
        typeDefs: `
            ${User.types}
            type Query {
               ${User.queries}
            }
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries,
            }
        },
    });

    await graphqlServer.start();

    app.use("/graphql", expressMiddleware(graphqlServer, {
        context: async ({ req, res }) => ({
            return: {
                user: req.headers.authorization ? JWTSevice.decodeToken(req.headers.authorization.split(" ")[1]) : undefined
            }
        }),
    }));

    return app;
}