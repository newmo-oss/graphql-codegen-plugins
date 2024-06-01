"use client";
import styles from "./page.module.css";
import {
    useCreateRideHistorySuspenseMutation,
    useListRideHistoriesSuspenseQuery
} from "../../generated/typescript/hooks";
import { Suspense, useEffect, useState } from "react";
const Main = () => {
    const query = useListRideHistoriesSuspenseQuery();
    const [mutate, { data, loading, error }] = useCreateRideHistorySuspenseMutation();
    const onClick = () => {
        mutate({
            variables: {
                desinationName: "test"
            }
        });
    };
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
                {loading && <p>Mutate Loading...</p>}
                {error && <p>Mutate Error...</p>}
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
