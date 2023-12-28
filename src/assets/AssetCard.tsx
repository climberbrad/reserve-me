import {
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Typography
} from "@mui/material";
import {AssetData} from "../Types.ts";
import {Link} from "react-router-dom";


export default function AssetCard(asset: AssetData): React.ReactElement {
    return (
        <Link to={`/asset-detail/${asset.id}`}>
            <Card sx={{width: 650, marginBottom: 4, background: '#f8f9fc'}}>
                <CardHeader
                    title={asset.name}
                    // subheader={`${formatDate(asset.availability[0].start)} - ${formatDate(asset.availability[0].end)}`}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={asset.image}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2">
                        {asset.location}
                        <br/>
                        "{asset.quote}"
                    </Typography>
                    <Typography variant="body2">
                        Sleeps: {asset.numSleeps}
                    </Typography>
                    <Typography variant="body2">
                        {/*available in: {daysFromNow(asset.availability[0].start)} days*/}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    )
}