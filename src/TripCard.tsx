import {Card, CardContent, Typography} from "@mui/material";
import {TripData} from "./Trip.tsx";
import {formatDate} from "./hooks/HookUtils.ts";

export default function TripCard(trip: TripData): React.ReactElement {
    if(!trip.asset || !trip.startDate || !trip.endDate) return <></>
    return (
        <Card variant='outlined' sx={{minWidth: 500, marginY: 2, background: '#ffffff'}}>
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.primary" gutterBottom>
                    {trip.name}
                </Typography>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Reserved: {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                </Typography>
                <Typography color='#994d3d' variant="h5" component="div">
                    {trip.asset.location}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    sleeps {trip.asset.numSleeps}
                </Typography>
                <Typography variant="body2">
                    {trip.asset.name}
                    <br/>
                    "{trip.asset.quote}"
                </Typography>
            </CardContent>
        </Card>
    )
}