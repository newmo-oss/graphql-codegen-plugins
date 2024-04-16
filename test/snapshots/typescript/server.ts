import { ApolloServer } from "@apollo/server";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {
    defineDestinationFactory,
    defineRideHistoryFactory,
    dynamic
} from "./fabbrica.js";
import * as fs from "node:fs/promises";
import path from "node:path";
import { startStandaloneServer } from "@apollo/server/standalone";

const Destination = defineDestinationFactory({
    defaultFields: {
        __typename: "Destination",
        id: dynamic(({ seq }) => `id-${seq}`),
        name: dynamic(({ seq }) => `name-${seq}`)
    }
});
const ride = defineRideHistoryFactory({
    defaultFields: {
        __typename: "RideHistory",
        destination: await Destination.build()
    }
});
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const apiDir = path.join(__dirname, "..", "..", "api/graphql");
const typeDefs = await fs.readFile(path.join(apiDir, "api.graphqls"), "utf-8");
const server = new ApolloServer({
    schema: addMocksToSchema({
        schema: makeExecutableSchema({ typeDefs }),
        mocks: {
            RideHistory: () => ride.build(),
            Destination: () => Destination.build()
        }
    })
});
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server listening at: ${url}`);
