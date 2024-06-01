import type { CodegenConfig } from "@graphql-codegen/cli";

const plugin = require.resolve("../lib/graphql-codegen-plugin-typescript-react-apollo.js");
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
            documentTransforms: []
        },
        "./test/snapshots/typescript/hooks.tsx": {
            plugins: [plugin],
            config: {
                typesFile: "./graphql" // required
            }
        }
    }
};

export default config;
