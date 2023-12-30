import {Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";
import useAssetHook from "../hooks/useAssetHook.ts";
import {formatDate} from "../util/DateUtils.ts";
import {TripData} from "../Types.ts";

export default function TripCard({trip}: { trip: TripData }): React.ReactElement {
    if (!trip || !trip.id || !trip.assetId || !trip.startDate || !trip.endDate) {
        return <Typography color='#000000'>Error: Unknown trip</Typography>
    }

    const assetHook = useAssetHook();
    const asset = assetHook.getAsset(trip.assetId).data

    return (
        <Card sx={{ minWidth: 650, marginBottom: 4, background: '#f8f9fc' }}>
            <CardHeader
                title={asset?.name}
                subheader={`${formatDate(trip.startDate)} - ${formatDate(trip.endDate)}`}
            />
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={asset?.image}
                    alt="beach"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Guests: {trip.guests.map((guest) => guest.firstName).join(',')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {asset?.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        checkin: 4pm
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}