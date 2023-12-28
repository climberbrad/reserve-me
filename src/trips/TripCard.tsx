import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
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
        <Card sx={{ minWidth: 650, marginY: 4 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={asset?.image}
                    alt="beach"
                />
                <CardContent>
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