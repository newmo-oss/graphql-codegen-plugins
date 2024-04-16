import { ApolloServer } from "@apollo/server";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {
    defineDestinationFactory,
    defineRideHistoryFactory,
    defineRideHistoryOutputFactory,
    dynamic
} from "./snapshots/typescript/fabbrica";
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
const RideHistory = defineRideHistoryFactory({
    defaultFields: {
        __typename: "RideHistory",
        destination: await Destination.build()
    }
});
const RideHistoryOutput = defineRideHistoryOutputFactory({
    defaultFields: {
        __typename: "RideHistoryOutput",
        name: dynamic(({ seq }) => `name-${seq}`),
        id: dynamic(({ seq }) => `id-${seq}`)
    }
});
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const apiDir = path.join(__dirname, "..", "test/api/graphql");
const typeDefs = await fs.readFile(path.join(apiDir, "api.graphqls"), "utf-8");
const mocks = await (async () => {
    const D = await Destination.build();
    const R = await RideHistory.build();
    const O = await RideHistoryOutput.build();
    return {
        RideHistory: () => R,
        Destination: () => D,
        RideHistoryOutput: () => O
    };
})();
const server = new ApolloServer({
    schema: addMocksToSchema({
        schema: makeExecutableSchema({
            typeDefs
        }),
        mocks: mocks
    })
});
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server listening at: ${url}`);
