import {ReactElement} from "react";
import {Typography} from "@mui/material";
import TripCard from "./TripCard.tsx";
import {TripData} from "./Types.ts";

interface TripsProps {
    isLoading: boolean,
    trips: TripData[],
}

export default function Trips(props: TripsProps): ReactElement {

    if (props.isLoading) return <Typography fontSize={54}>Loading...</Typography>
    // if (tripHook.tripsQuery.isError) return <pre>{JSON.stringify(tripHook.tripsQuery.error)}</pre>

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