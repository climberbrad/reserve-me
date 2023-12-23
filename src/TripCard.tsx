import {Box, Card, CardActionArea, CardContent, CardMedia, Paper, Typography} from "@mui/material";
import {TripData} from "./Trip.tsx";
import useAssetHook from "./hooks/useAssetHook.ts";
import {formatDate} from "./hooks/HookUtils.ts";

export default function TripCard({trip}: { trip: TripData }): React.ReactElement {
    if (!trip || !trip.id || !trip.assetId || !trip.startDate || !trip.endDate) {
        return <Typography color='#000000'>Error: Unknown trip</Typography>
    }

    const assetHook = useAssetHook();
    const asset = assetHook.getAsset(trip.assetId).data

    return (
        <Card sx={{ minWidth: 450 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://st4.depositphotos.com/10440072/40457/i/450/depositphotos_404572958-stock-photo-perfect-beach-view-summer-holiday.jpg"
                    alt="beach"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {trip.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {asset?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {asset?.location}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}