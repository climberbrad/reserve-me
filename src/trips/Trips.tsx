import {ReactElement} from "react";
import {Typography} from "@mui/material";
import TripCard from "./TripCard.tsx";
import {TripData} from "../Types.ts";

interface TripsProps {
    isLoading: boolean,
    isError: boolean,
    error: Error | null,
    trips: TripData[],
}

export default function Trips(props: TripsProps): ReactElement {

    if (props.isLoading) return <Typography fontSize={54}>Loading...</Typography>
    if (props.isError) return <pre>{JSON.stringify(props.error)}</pre>

    return (
        <>
            {props.trips
                .sort((a, b) =>
                    (a.startDate && b.startDate) ? a.startDate - b.startDate : 0)
                .map((trip) => (
                    <TripCard key={trip.id} trip={trip}/>
                ))}
        </>
    )
}