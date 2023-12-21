import './App.css'
import {Trip, TripData} from "./Trip.tsx";
import {EMPTY_TRIP} from "./SampleData.ts";
import {useState} from "react";
import {AppBar, Drawer, Toolbar, Typography} from "@mui/material";
import AssetList from "./AssetList.tsx";


function App() {
    const [trip, setTrip] = useState<TripData>(EMPTY_TRIP)

    const handleUpdateTrip = (trip: TripData) => {
        setTrip(trip)
    }

    const drawerWidth = 250;

    return (
        <>
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography fontSize={36} color='#ffffff'>Weekend Getaway</Typography>
                </Toolbar>
            </AppBar>
            <Toolbar/>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Trip trip={trip} handleUpdateTrip={handleUpdateTrip}/>
            </Drawer>
            <AssetList {...trip} />
        </>
    )
}

export default App
