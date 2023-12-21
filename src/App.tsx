import './App.css'
import {Trip, TripData} from "./Trip.tsx";
import {EMPTY_TRIP} from "./SampleData.ts";
import {useState} from "react";
import {Drawer} from "@mui/material";
import AssetList from "./AssetList.tsx";
import {AssetData} from "./AssetCard.tsx";
import useTripHook from "./hooks/useTripHook.ts";
import HeaderBar from "./HeaderBar.tsx";

export const drawerWidth = 250;

function App() {
    const [trip, setTrip] = useState<TripData>(EMPTY_TRIP)
    const tripHook = useTripHook();

    const handleUpdateTrip = (trip: TripData) => {
        setTrip(trip)
    }

    const handleReserve = (asset: AssetData) => {
        console.log('Reserve', asset.name)
        tripHook.createTrip.mutate(trip)
        setTrip(trip)
    }


    return (
        <>
            <HeaderBar />
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
            <AssetList trip={trip} handleReserve={handleReserve}/>
        </>
    )
}

export default App
