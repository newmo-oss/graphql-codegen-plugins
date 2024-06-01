"use client";
import styles from "./page.module.css";
import {
    useCreateRideHistorySuspenseMutation,
    useListRideHistoriesSuspenseQuery
} from "../../generated/typescript/hooks";
import { CreateRideHistoryMutationVariables } from "../../generated/typescript/graphql";

import { Suspense, useActionState, useEffect, useState } from "react";
import { GraphQLError } from "graphql/error";
import type { FetchResult } from "@apollo/client/link/core";

class GraphQLNoDataResponseError extends Error {
    constructor() {
        super("No data");
    }
}

class GraphQLTopLevelErrors {
    constructor(public errors: readonly GraphQLError[]) {}

    get message() {
        return this.errors.map((error) => error.message).join("\n");
    }
}

function getGraphQLMutationResult<TData>(result: FetchResult<TData>):
    | {
          ok: true;
          data: TData;
      }
    | {
          ok: false;
          error: GraphQLTopLevelErrors | GraphQLNoDataResponseError;
      } {
    if (result.errors) {
        return {
            ok: false,
            error: new GraphQLTopLevelErrors(result.errors)
        };
    }
    const data = result.data;
    if (!data) {
        return {
            ok: false,
            error: new GraphQLNoDataResponseError()
        };
    }
    return {
        ok: true,
        data: data
    };
}
// Error Handling
const DisplayError = ({ errors }: { errors: ReturnType<typeof useMain>["errors"] }) => {
    if (!errors) return null;
    // Common Error Case
    if (errors instanceof GraphQLTopLevelErrors) {
        return <div>{errors.message}</div>;
    }
    if (errors instanceof GraphQLNoDataResponseError) {
        return <div>{errors.message}</div>;
    }
    // Application Error Case
    return (
        <div data-testid={"error"}>
            {errors.map((error) => {
                if ("type" in error) {
                    switch (error.type) {
                        case "MissingNameError":
                            return <div key={error.message}>{error.message}</div>;
                    }
                }
                // FIXME: isTextError does not work narrowing
                // https://github.com/microsoft/TypeScript/issues/55766
                if ("__typename" in error) {
                    switch (error.__typename) {
                        case "TextError":
                            return <div key={error.message}>{error.message}</div>;
                        case "CreateRideHistoryErrorDetails":
                            return <div key={error.message}>{error.message}</div>;
                    }
                }
                return <div key={"unkown"}>Unknown Error: {error satisfies never}</div>;
            })}
        </div>
    );
};

// Validation
type MissingNameError = {
    type: "MissingNameError";
    message: string;
};

type ValidationError = MissingNameError;
const createCreateRideHistoryMutationVariables = (
    name: string
):
    | {
          ok: true;
          value: CreateRideHistoryMutationVariables;
      }
    | {
          ok: false;
          errors: ValidationError[];
      } => {
    if (!name) {
        return {
            ok: false,
            errors: [
                {
                    type: "MissingNameError",
                    message: "Name is required"
                }
            ]
        };
    }
    return {
        ok: true,
        value: {
            desinationName: name
        }
    };
};
const useMain = () => {
    const query = useListRideHistoriesSuspenseQuery();
    const [mutate, { data }] = useCreateRideHistorySuspenseMutation();
    const [errors, onClick, loading] = useActionState(async (prev: unknown, event: unknown) => {
        const input = createCreateRideHistoryMutationVariables("test");
        if (!input.ok) {
            return input.errors;
        }
        const result = getGraphQLMutationResult(
            await mutate({
                variables: input.value
            })
        );
        if (!result.ok) {
            return result.error;
        }
        const data = result.data;
        if (data.createRideHistory.errors.length > 0) {
            return data.createRideHistory.errors;
        }
        // When mutation is success, you can do something
        // TODO: do something
    }, null);
    return { query, onClick, data, loading, errors } as const;
};
const Main = () => {
    const { loading, errors, query, onClick, data } = useMain();
    return (
        <main className={styles.main}>
            <Suspense fallback={<div>Loading...</div>}>
                <ul>
                    {query.data?.rideHistories.map((ride) => (
                        <li key={ride.id}>
                            <p>{ride.destination.name}</p>
                        </li>
                    ))}
                </ul>
            </Suspense>
            <button onClick={onClick} data-testid={"mutate-button"}>
                Mutate
            </button>
            <div>
                {errors && <DisplayError errors={errors} />}
                {data && <p data-testid={"mutate-result"}>Mutate Success... → {data.createRideHistory.name}</p>}
            </div>
        </main>
    );
};
export default function Home() {
    const [isSSR, setIsSSR] = useState(true);
    useEffect(() => {
        setIsSSR(false);
    }, []);
    if (isSSR) {
        return <div>SSR...</div>;
    }
    return <Main />;
}
