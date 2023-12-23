import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Typography
} from "@mui/material";
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
    image: string;
}

interface CardProps {
    reserve: (asset: AssetData) => void;
    asset: AssetData;
}

export default function AssetCard(props: CardProps): React.ReactElement {
    return (
        <Card sx={{width: 650, marginBottom: 4}}>
            <CardHeader
                title={props.asset.name}
                subheader={`${formatDate(props.asset.startDate)} - ${formatDate(props.asset.endDate)}`}
            />
            <CardMedia
                component="img"
                height="194"
                image={props.asset.image}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2">
                    {props.asset.location}
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