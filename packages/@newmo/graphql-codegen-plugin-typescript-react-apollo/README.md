# @newmo/graphql-codegen-plugin-typescript-react-apollo

[GraphQL Codegen Plugin](https://github.com/dotansimha/graphql-code-generator) to create React Hooks using [Apollo's client](https://www.apollographql.com/docs/react/) for [Client preset](https://the-guild.dev/graphql/codegen/plugins/presets/preset-client)

## Motivation

> We now recommend using the client-preset package for a better developer experience and smaller impact on bundle size.
> -- [typescript-react-apollo](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-react-apollo) is not recommended to use with `@newmo/graphql-codegen-plugin-typescript-react-apollo` because it is not maintained.

However, [Client preset](https://the-guild.dev/graphql/codegen/plugins/presets/preset-client) does not generate `React Hooks` for `@appllo/client`.

This plugin generates React Hooks using Apollo's client.
Also, This plugin depends on [Client preset](https://the-guild.dev/graphql/codegen/plugins/presets/preset-client).

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @newmo/graphql-codegen-plugin-typescript-react-apollo --save-dev
    # this plugin depends on @graphql-codegen/client-preset
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
            preset: 'client'
        },
        // generates React Hooks using Apollo's client to api/generated/hooks.tsx
        './api/generated/hooks.tsx': {
            'plugins': [
                '@newmo/graphql-codegen-plugin-typescript-react-apollo'
            ],
            config: {
                // path to generated types
                // In this case, it refer './api/generated/graphql.ts'
                typesFile: './graphql'
            }
        }
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
