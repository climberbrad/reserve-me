import {Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, Typography} from "@mui/material";
import useAssetHook from "../hooks/useAssetHook.ts";
import {TripData} from "../Types.ts";
import CheckInOut from "./CheckInOut.tsx";
import {blue} from "@mui/material/colors";
import React from "react";

export default function TripCard({trip}: { trip: TripData }): React.ReactElement {
    if (!trip || !trip.id || !trip.assetId || !trip.startDate || !trip.endDate) {
        return <Typography color='#000000'>Error: Unknown trip</Typography>
    }

    const assetHook = useAssetHook();
    const asset = assetHook.getAsset(trip.assetId).data

    return (
        <Card sx={{minWidth: 650, maxWidth: 800, marginBottom: 4, background: '#f8f9fc'}}>
            <CardHeader
                title={asset?.name}
            />
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={asset?.image}
                    alt="beach"
                />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <Box>
                            <Typography fontSize={24}>
                                {asset?.location}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                1234 Main St. Building D Apt. 1298
                            </Typography>
                            <Typography color={blue[800]}>
                                directions
                            </Typography>
                        </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <CheckInOut {...trip}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography fontFamily='sans-serif' align='left'>We hope you find your most wonderful stay with us. Enjoy our
                                amazing amenities like the luxurious bath or our wonderful blender.
                                Pop toast with modern kitchen appliances as you relax on our rustic
                                chair and enjoy wifi or TV. Let the comfort sink in and enjoy your stay.
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}