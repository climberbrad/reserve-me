import {ReactElement} from "react";
import {Typography} from "@mui/material";
import {TripData} from "./Trip.tsx";
import TripCard from "./TripCard.tsx";

interface TripsProps {
    isLoading: boolean,
    trips: TripData[],
}
export default function Trips(props: TripsProps): ReactElement {

    if (props.isLoading) return <Typography fontSize={54}>Loading...</Typography>
    // if (tripHook.tripsQuery.isError) return <pre>{JSON.stringify(tripHook.tripsQuery.error)}</pre>

    return (<>
        {props.trips.map((trip) => (
            trip.asset && <TripCard key={trip.id} {...trip} />
        ))}
    </>)
}