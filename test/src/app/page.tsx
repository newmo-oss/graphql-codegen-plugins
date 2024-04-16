"use client";
import styles from "./page.module.css";
import {
    useCreateRideHistorySuspenseMutation,
    useListRideHistoriesSuspenseQuery
} from "../../../test/snapshots/typescript/hooks";
import { Suspense } from "react";

export default function Home() {
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
            <button onClick={onClick}>Mutate</button>
            <div>
                {loading && <p>Mutate Loading...</p>}
                {error && <p>Mutate Error...</p>}
                {data && <p>Mutate Success... → {data.createRideHistory.name}</p>}
            </div>
        </main>
    );
}