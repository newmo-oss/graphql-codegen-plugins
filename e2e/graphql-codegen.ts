import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: "./api/graphql/api.graphqls",
    documents: "./api/graphql/query.graphql",
    generates: {
        "./generated/typescript/": {
            preset: "client",
            presetConfig: {
                fragmentMasking: { unmaskFunctionName: "getFragmentData" }
            },
            documentTransforms: []
        },
        "./generated/typescript/hooks.tsx": {
            plugins: ["@newmo/graphql-codegen-plugin-typescript-react-apollo"],
            config: {
                typesFile: "./graphql" // required
            }
        }
    }
};

export default config;
