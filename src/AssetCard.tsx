import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Typography
} from "@mui/material";
import {AssetData} from "./Types.ts";

interface CardProps {
    reserve: (asset: AssetData) => void;
    asset: AssetData;
}

export default function AssetCard(props: CardProps): React.ReactElement {
    return (
        <Card sx={{width: 650, marginBottom: 4}}>
            <CardHeader
                title={props.asset.name}
                // subheader={`${formatDate(props.asset.availability[0].start)} - ${formatDate(props.asset.availability[0].end)}`}
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
                <Typography variant="body2">
                    Sleeps: {props.asset.numSleeps}
                </Typography>
                <Typography variant="body2">
                    {/*available in: {daysFromNow(props.asset.availability[0].start)} days*/}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => props.reserve(props.asset)}>Reserve</Button>
            </CardActions>
        </Card>
    )
}