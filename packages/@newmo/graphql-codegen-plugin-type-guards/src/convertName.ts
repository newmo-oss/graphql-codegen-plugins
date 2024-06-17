import { convertFactory } from "@graphql-codegen/visitor-plugin-common";
import type { ASTNode } from "graphql/index.js";
import type { PluginConfig } from "./config";

/**
 * Convert the name of the node to the generated type name
 * Client preset use this naming convention
 * https://www.npmjs.com/package/@graphql-codegen/client-preset
 * @param node
 * @param config
 */
export function convertName(node: ASTNode | string, config: PluginConfig): string {
    const convert = config.namingConvention
        ? convertFactory({ namingConvention: config.namingConvention })
        : convertFactory({});
    let convertedName = "";
    convertedName += config.typesPrefix;
    convertedName += convert(node);
    convertedName += config.typesSuffix;
    return convertedName;
}
