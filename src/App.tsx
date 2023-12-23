import './App.css'
import {Trip, TripData} from "./Trip.tsx";
import {EMPTY_TRIP} from "./SampleData.ts";
import {useState} from "react";
import {Alert, Drawer, Snackbar} from "@mui/material";
import AssetList from "./AssetList.tsx";
import {AssetData} from "./AssetCard.tsx";
import useTripHook from "./hooks/useTripHook.ts";
import HeaderBar from "./HeaderBar.tsx";
import {
    Route,
    Routes, useNavigate
} from "react-router-dom";
import Trips from "./Trips.tsx";
import useAssetHook from "./hooks/useAssetHook.ts";
import {isValidTrip} from "./hooks/HookUtils.ts";

export const drawerWidth = 250;

// TODO
// [ ] Optimistic updates
// [ ] Endless scroll
// [ ] Search
// [ ] Google maps
// [ ] Backend API

function App() {
    const [trip, setTrip] = useState<TripData>(EMPTY_TRIP)
    const [tripError, setTripError] = useState<boolean>(false)

    const tripHook = useTripHook();
    const assetHook = useAssetHook();
    const navigate = useNavigate();

    const handleUpdateTrip = (trip: TripData) => {
        setTrip(trip)
    }

    const handleReserve = (asset: AssetData): void => {
        if(!isValidTrip(trip)) {
            setTripError(true)
            return
        }

        const reserved = {...asset, available: false};
        assetHook.update.mutate(reserved)
        tripHook.createTripMutation.mutate({...trip, asset: reserved})
        setTrip(EMPTY_TRIP)
        navigate('/trips')

    }

    const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setTripError(false);
    };

    return (
        <>
                <HeaderBar/>
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
                <Routes>
                    <Route path="*"
                           element={
                        <AssetList
                            isLoading={assetHook.results.isLoading}
                            assets={assetHook.results.data || []}
                            isError={assetHook.results.isError}
                            error={assetHook.results.error}
                            trip={trip} handleReserve={handleReserve}/>
                    }/>
                    <Route
                        key={'/trips/'}
                        path={'/trips/'}
                        element={<Trips trips={tripHook.tripsQuery.data || []}
                                        isLoading={tripHook.createTripMutation.isPending || tripHook.tripsQuery.isLoading}/>}
                    />
                </Routes>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                      open={tripError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    Please Fill out All Trip Fields!
                </Alert>
            </Snackbar>
        </>
    )
}

export default App
