import type { CodegenConfig } from "@graphql-codegen/cli";

const plugin = require.resolve("../lib/graphql-codegen-plugin-type-guards.js");
const config: CodegenConfig = {
    overwrite: true,
    schema: "./test/api/graphql/api.graphqls",
    documents: "./test/api/graphql/query.graphql",
    generates: {
        "./test/snapshots/typescript/": {
            preset: "client",
            presetConfig: {
                fragmentMasking: { unmaskFunctionName: "getFragmentData" }
            },
            plugins: [plugin]
        }
    }
};

export default config;
