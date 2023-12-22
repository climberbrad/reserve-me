import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {formatDate} from "./hooks/HookUtils.ts";

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

export default function AssetCard(props: CardProps): React.ReactElement {

    return (
        <Card variant='outlined' sx={{minWidth: 500, marginY: 2, background: '#ffffff'}}>
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Available: {formatDate(props.asset.startDate)} - {formatDate(props.asset.endDate)}
                </Typography>
                <Typography color='#994d3d' variant="h5" component="div">
                    {props.asset.location}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    sleeps {props.asset.numSleeps}
                </Typography>
                <Typography variant="body2">
                    {props.asset.name}
                    <br/>
                    "{props.asset.quote}"
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => props.reserve(props.asset)}>Reserve</Button>
            </CardActions>
        </Card>
    )
}