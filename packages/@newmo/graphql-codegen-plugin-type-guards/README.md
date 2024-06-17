# @newmo/graphql-codegen-plugin-type-guards

[GraphQL Codegen Plugin](https://github.com/dotansimha/graphql-code-generator) to create TypeScript type guards for GraphQL types.

```graphql
type RideHistory {
    "ID of the ride history."
    id: ID!

    "Destination of the ride history."
    destination: Destination!
}

enum DestinationType {
    "Airport"
    AIRPORT

    "Station"
    STATION

    "City"
    CITY
}

type Destination {
    "ID of the destination."
    id: ID!

    "Name of the destination."
    name: String! @exampleString(value: "Osaka")

    "Type of the destination."
    type: DestinationType!
}

"""
Error interface
"""
interface Error {
    "Error message."
    message: String!
    "Localized error message."
    localizedMessage: String!
}
type TextError implements Error {
    "Error message."
    message: String!

    "Localized error message."
    localizedMessage: String!
}
"""
Specified Error type for createRideHistory mutation.
"""
type CreateRideHistoryErrorDetails implements Error{
    code: Int!
    message: String!
    localizedMessage: String!
}
union ErrorUnion = TextError | CreateRideHistoryErrorDetails
```

->

```ts
// Type guard for each type
export const isDestination = (field: { __typename?: string; }): field is Destination => field.__typename === 'Destination';
export const isRideHistory = (field: { __typename?: string; }): field is RideHistory => field.__typename === 'RideHistory';
// Union type guard
export const isCreateRideHistoryErrorDetails = (field: { __typename?: string; }): field is CreateRideHistoryErrorDetails => field.__typename === 'CreateRideHistoryErrorDetails';
export const isTextError = (field: { __typename?: string; }): field is TextError => field.__typename === 'TextError';
export const isErrorUnion = (field: { __typename?: string; }): field is ErrorUnion => {
    if(field.__typename === undefined) return false;
    return ["CreateRideHistoryErrorDetails","TextError"].includes(field.__typename);
};
```

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @newmo/graphql-codegen-plugin-type-guards --save-dev
    # This plugin depends on @graphql-codegen/client-preset
    npm install @graphql-codegen/cli @graphql-codegen/client-preset @graphql-typed-document-node/core --save-dev

## Usage

You need to it with [Client preset](https://the-guild.dev/graphql/codegen/plugins/presets/preset-client).

Your `graphql-codegen.ts` should look like this:

```ts
import type { CodegenConfig } from '@graphql-codegen/cli';
const config: CodegenConfig = {
    overwrite: true,
    schema: "./api/graphql/api.graphqls",
    documents: "./api/graphql/query.graphql",
    generates: {
        // generates types to api/generated/*
        './api/generated/': {
            preset: 'client',
            config: {
                // Required: type guard function depends on non-optional `__typename` field
                nonOptionalTypename: true,
            },
            plugins: [
                '@newmo/graphql-codegen-plugin-typescript-type-guards',
            ],
        },
    }
};

export default config;
```

Run codegen:

    $ graphql-codegen --config graphql-codegen.ts

## Options

- `namingConvention` (optional): Naming convention for the generated types. Default is `change-case#pascalCase`.
    - [Naming Convention](https://the-guild.dev/graphql/codegen/docs/config-reference/naming-convention)
- `typesPrefix` (optional): Prefix for the generated types.
- `typesSuffix` (optional): Suffix for the generated types.

## Example output

See [test/snapshots/typescript/graphql.ts](test/snapshots/typescript/graphql.ts) for example output.

## Changelog

See [Releases page](https://github.com/newmo-oss/graphql-codegen-plugins/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/newmo-oss/graphql-codegen-plugins/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT © newmo, Inc.
