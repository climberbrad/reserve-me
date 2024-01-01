import './App.css'
import {useState} from "react";
import {Alert, Snackbar} from "@mui/material";
import AssetList from "./assets/AssetList.tsx";
import useTripHook from "./hooks/useTripHook.ts";
import HeaderBar from "./HeaderBar.tsx";
import {
    Route,
    Routes
} from "react-router-dom";
import Trips from "./trips/Trips.tsx";
import useAssetHook from "./hooks/useAssetHook.ts";
import {AssetFilter, DEFAULT_FILTER} from "./Types.ts";
import AssetDetail from "./assets/AssetDetail.tsx";

export const drawerWidth = 250;

// TODO
// [X] Optimistic updates
// [X] Backend API
// [X] test API errors
// [ ] Endless scroll
// [ ] rename API to server
// [ ] Google maps

// ideas
// [ ] filters work on trips and asset list but not on asset-detail page
// [ ] add graphs for usage (# reserved/month) ($spent/month) (#people/reservation) (locations)
// [ ] make [directions] work with google maps

function App() {
    const [filter, setFilter] = useState<AssetFilter>(DEFAULT_FILTER)
    const [tripError, setTripError] = useState<boolean>(false)


    const tripHook = useTripHook();
    const assetHook = useAssetHook();

    const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setTripError(false);
    };

    return (
        <>
            <HeaderBar filter={filter} handleUpdateFilter={setFilter}/>
            <Routes>
                <Route path="*"
                       element={
                           <AssetList
                               isLoading={assetHook.results.isLoading}
                               assets={assetHook.results.data || []}
                               isError={assetHook.results.isError}
                               error={assetHook.results.error}
                               filter={filter}/>
                       }/>
                <Route
                    key={'/trips/'}
                    path={'/trips/'}
                    element={
                        <Trips
                            trips={tripHook.results.data || []}
                            isLoading={tripHook.create.isPending || tripHook.results.isLoading}
                            isError={tripHook.create.isError || tripHook.results.isError}
                            error={tripHook.create.error}
                        />
                    }
                />
                <Route key={'/asset-detail'}
                       path={'/asset-detail/:id'}
                       element={<AssetDetail/>}
                />
            </Routes>
            <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                      open={tripError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    Please Fill out All Trip Fields!
                </Alert>
            </Snackbar>
        </>
    )
}

export default App
