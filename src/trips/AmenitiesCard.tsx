import React from "react";
import {Box, Typography} from "@mui/material";
import WifiIcon from '@mui/icons-material/Wifi';
import ConnectedTvIcon from '@mui/icons-material/ConnectedTv';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BlenderIcon from '@mui/icons-material/Blender';

export default function AmenitiesCard(): React.ReactElement {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
            <Typography color='#000000' fontFamily='sans-serif' fontSize={20}>Amenities</Typography>
            <Box>
                <WifiIcon/>
                <ConnectedTvIcon/>
                <BathtubIcon/>
                <BlenderIcon/>
            </Box>
        </Box>
    )
}