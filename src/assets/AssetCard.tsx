import {
    Box,
    Card,
    CardContent,
    CardMedia, Rating,
    Typography
} from "@mui/material";
import {AssetData} from "../Types.ts";
import {Link} from "react-router-dom";
import React from "react";

interface AssetCardProps {
    index: number;
    asset: AssetData;
}

export default function AssetCard(props: AssetCardProps): React.ReactElement {
    return (
        <Link to={`/asset-detail/${props.asset.id}`}>
            <Card sx={{marginBottom: 4, background: '#f8f9fc'}}>
                <Box sx={{display: 'flex', flexDirection: props.index % 2 === 0 ? 'row-reverse' : 'row'}}>
                <CardMedia
                    component="img"
                    height="350"
                    image={props.asset.image}
                    alt="Paella dish"
                />

                <CardContent sx={{width: 650}}>
                    <Typography fontSize={42}>{props.asset.name}</Typography>
                    <Box sx={{marginBottom: 6}}>
                        <Rating name="read-only" value={props.asset.stars} readOnly/>
                        <Typography fontSize={12} color='black' component="legend">{props.asset.reviews} Reviews</Typography>
                    </Box>
                    <Typography variant="body2">
                        {props.asset.location}
                        <br/>
                        "{props.asset.quote}"
                    </Typography>
                    <Typography variant="body2">
                        Sleeps: {props.asset.numSleeps}
                    </Typography>
                    <Typography variant="body2">
                        {/*available in: {daysFromNow(asset.availability[0].start)} days*/}
                    </Typography>
                </CardContent>
                </Box>
            </Card>
        </Link>
    )
}