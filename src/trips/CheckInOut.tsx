import {Box, Divider, Typography} from "@mui/material";
import React from "react";
import WifiIcon from "@mui/icons-material/Wifi";
import ConnectedTvIcon from "@mui/icons-material/ConnectedTv";
import BathtubIcon from "@mui/icons-material/Bathtub";
import BlenderIcon from "@mui/icons-material/Blender";

export default function CheckInOut(): React.ReactElement {
    return (
        <Box sx={{marginBottom: 2 }}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', paddingBottom: 2}}>
                <Box sx={{marginLeft: 2}}>
                    <Typography color='#000000' fontFamily='sans-serif' fontSize={20}>Check-in</Typography>
                    <Typography fontFamily='sans-serif' fontSize={14}>February 15th</Typography>
                    <Typography fontFamily='sans-serif' fontSize={14}>4:00pm</Typography>

                </Box>
                <Divider sx={{height: 50}} orientation='vertical' variant='fullWidth'/>
                <Box>
                    <Typography color='#000000' fontFamily='sans-serif' fontSize={20}>Check-out</Typography>
                    <Typography fontFamily='sans-serif' fontSize={14}>February 20th</Typography>
                    <Typography fontFamily='sans-serif' fontSize={14}>11:00am</Typography>

                </Box>
                <Divider sx={{height: 50}} orientation='vertical' variant='fullWidth'/>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, marginRight: 2}}>
                    <Typography color='#000000' fontFamily='sans-serif' fontSize={20}>Amenities</Typography>
                    <Box display='flex' gap={1}>
                        <WifiIcon/>
                        <ConnectedTvIcon/>
                        <BathtubIcon/>
                        <BlenderIcon/>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}