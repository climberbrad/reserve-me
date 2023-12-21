import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";

export interface AssetData {
    id: string;
    startDate: number;
    endDate: number;
    name: string;
    location: string;
    quote: string;
    numSleeps: number;
    available: boolean;
}

interface CardProps {
    reserve: (asset: AssetData) => void;
    asset: AssetData;
}

const formatDate = (utc: number): string => {
    const date = new Date(utc)

    return `${date.getMonth()+1}/${date.getDate()+1}`
}

export default function AssetCard(data: CardProps): React.ReactElement {
    return (
        <Card variant='outlined' sx={{ minWidth: 500, marginY: 2, background: '#ffffff' }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Available: {formatDate(data.asset.startDate)} - {formatDate(data.asset.endDate)}
                </Typography>
                <Typography variant="h5" component="div">
                    {data.asset.location}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    sleeps {data.asset.numSleeps}
                </Typography>
                <Typography variant="body2">
                    {data.asset.name}
                    <br />
                    "{data.asset.quote}"
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => data.reserve(data.asset)}>Reserve</Button>
            </CardActions>
        </Card>
    )
}