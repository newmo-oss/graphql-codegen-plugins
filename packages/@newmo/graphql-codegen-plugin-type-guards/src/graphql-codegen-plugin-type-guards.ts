import { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import { GraphQLSchema, isIntrospectionType, isScalarType, isSpecifiedScalarType, isUnionType } from "graphql";
import { type GraphQLNamedType, isEnumType, isInputObjectType, isInterfaceType } from "graphql/type/definition";

const getUserDefinedTypes = (schema: GraphQLSchema) => {
    const typeMap = schema.getTypeMap();
    const allTypeNames = Object.keys(typeMap);
    const userDefinedTypes = allTypeNames.filter((typeName) => {
        const type = typeMap[typeName];
        if (!type) return;

        // excludes enum - because it does not have __typename
        if (isEnumType(type)) return false;
        // excludes input type - because it does not have __typename
        if (isInputObjectType(type)) return false;
        // excludes interface - because it does not have __typename
        if (isInterfaceType(type)) return false;
        // excludes scalar - because it does not have __typename
        if (isScalarType(type)) return false;
        // excludes introspection - because it does not have __typename
        if (isIntrospectionType(type)) return false;
        // excludes specified scalar - because it does not have __typename
        if (isSpecifiedScalarType(type)) return false;

        return true;
    });

    return { userDefinedTypes };
};

const getUnionTypes = (type: GraphQLNamedType) => {
    // expand union type to A | B | C
    if (isUnionType(type)) {
        return type.getTypes().map((type) => type.name);
    }
    return [];
};

export const plugin: PluginFunction<Types.Config, Types.PluginOutput> = (schema, _, userDefinedConfig) => {
    const { userDefinedTypes } = getUserDefinedTypes(schema);
    return userDefinedTypes
        .map((typeName) => {
            // is union type
            const typeInfo = schema.getType(typeName);
            if (isUnionType(typeInfo)) {
                const unionTypes = getUnionTypes(typeInfo);
                return `\
export const is${typeName} = (field: { __typename?: string; }): field is ${typeName} => {
  if(field.__typename === undefined) return false;
  return ${JSON.stringify(unionTypes)}.includes(field.__typename);           
};`;
            }

            return `export const is${typeName} = (field: { __typename?: string; }): field is ${typeName} => field.__typename === '${typeName}';`;
        })
        .join("\n");
};
