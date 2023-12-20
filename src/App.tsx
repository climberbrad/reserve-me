import './App.css'
import AssetCard, {AssetData} from "./AssetCard.tsx";
import {Trip, TripData} from "./Trip.tsx";
import {assets, myTrip} from "./SampleData.ts";
import {useState} from "react";
import {Drawer} from "@mui/material";


function App() {
    const [trip, setTrip] = useState<TripData>(myTrip)

    const handleReserve = (asset: AssetData) => {
        console.log('Reserve', asset.name)
    }

    const handleUpdateTrip = (trip: TripData) => {
        setTrip(trip)
    }

    const filterStart = (asset: AssetData, trip: TripData): boolean => {
        if (trip.startDate) {
            return trip.startDate >= asset.startDate && trip.startDate < asset.endDate;
        }

        return true;
    }

    const filterEnd = (asset: AssetData, trip: TripData): boolean => {
        if (trip.endDate) {
            return asset.endDate >= trip.endDate && asset.startDate < trip.endDate
        }

        return true
    }

    const filterNumPeople = (asset: AssetData, trip: TripData): boolean => {
        if (trip.numPeople > 0) {
            return asset.numSleeps >= trip.numPeople;
        }

        return true;
    }

    return (
        <>
            <Drawer
                sx={{
                    width: 250,
                    background: '#2f2828',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 250,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Trip trip={trip} handleUpdateTrip={handleUpdateTrip}/>
            </Drawer>
            {
                assets
                    .filter((asset) => filterNumPeople(asset, trip))
                    .filter((asset) => filterStart(asset, trip))
                    .filter((asset) => filterEnd(asset, trip))
                    .map((asset) => <AssetCard key={asset.id} asset={asset} reserve={handleReserve}/>)
            }
        </>
    )
}

export default App
