import type { CodegenPlugin } from "@graphql-codegen/plugin-helpers";
import { normalizeConfig, RawPluginConfig } from "./config";
import { convertName } from "./convertName";
const plugin: CodegenPlugin<RawPluginConfig> = {
    plugin(schema, documents, rawConfig, _info) {
        const config = normalizeConfig(rawConfig);
        // need to support mutation, query, subscription
        const generateSuspenseQuery = (name: string) => {
            return `export function use${name}SuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<${name}Query, ${name}QueryVariables>): Apollo.UseSuspenseQueryResult<${name}Query, ${name}QueryVariables> {
    const options = { ...baseOptions };
    return Apollo.useSuspenseQuery<${name}Query, ${name}QueryVariables>(${name}Document, options);
}`;
        };
        const generateSuspenseMutation = (name: string) => {
            return `export function use${name}SuspenseMutation(baseOptions?: Apollo.MutationHookOptions<${name}Mutation, ${name}MutationVariables>): Apollo.MutationTuple<${name}Mutation, ${name}MutationVariables> {
    const options = { ...baseOptions };
    return Apollo.useMutation<${name}Mutation, ${name}MutationVariables>(${name}Document, options);
}`;
        };
        const importQueryIdentifierName = (documentName: string) => {
            return `import { ${documentName}Document } from '${config.typesFile}';
import type { ${documentName}Query, ${documentName}QueryVariables } from '${config.typesFile}';`;
        };
        const importMutationIdentifierName = (documentName: string) => {
            return `import { ${documentName}Document } from '${config.typesFile}';
import type { ${documentName}Mutation, ${documentName}MutationVariables } from '${config.typesFile}';`;
        };
        return `/* eslint-disable */
// This file was generated by a @newmo/graphql-codegen-plugin-typescript-react-apollo
import * as Apollo from '@apollo/client';
${documents
    .flatMap((document) => {
        return document.document?.definitions?.map((definition) => {
            // query
            if (definition.kind === "OperationDefinition" && definition.operation === "query" && definition.name) {
                return importQueryIdentifierName(convertName(definition.name.value, config));
            } else if (
                definition.kind === "OperationDefinition" &&
                definition.operation === "mutation" &&
                definition.name
            ) {
                return importMutationIdentifierName(convertName(definition.name.value, config));
            }
        });
    })
    .join("\n")}
${documents
    .flatMap((document) => {
        return document.document?.definitions?.map((definition) => {
            // query
            if (definition.kind === "OperationDefinition" && definition.operation === "query" && definition.name) {
                return generateSuspenseQuery(convertName(definition.name.value, config));
            } else if (
                definition.kind === "OperationDefinition" &&
                definition.operation === "mutation" &&
                definition.name
            ) {
                return generateSuspenseMutation(convertName(definition.name.value, config));
            }
        });
    })
    .join("\n")}
`;
    }
};
// GraphQL Codegen Plugin requires CommonJS export
module.exports = plugin;
