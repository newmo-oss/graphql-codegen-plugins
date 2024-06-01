# @newmo/graphql-codegen-plugin-type-guards

[GraphQL Codegen Plugin](https://github.com/dotansimha/graphql-code-generator) to create TypeScript type guards for GraphQL types.

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

## Example output

See [test/snapshots/typescript](test/snapshots/typescript) for example output.

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
