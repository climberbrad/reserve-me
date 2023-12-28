import './App.css'
import {Sidebar} from "./trips/Sidebar.tsx";
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
import {AssetFilter, EMPTY_ASSET_FILTER} from "./Types.ts";
import AssetDetail from "./assets/AssetDetail.tsx";

export const drawerWidth = 250;

// TODO
// [ ] Optimistic updates
// [ ] Endless scroll
// [ ] Search
// [ ] Google maps
// [x] Backend API
// [ ] test API errors
// [ ] rename API to server

function App() {
    const [filter, setFilter] = useState<AssetFilter>(EMPTY_ASSET_FILTER)
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
            <HeaderBar/>
            <Sidebar filter={filter} handleFilter={setFilter}/>
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
                            isError={tripHook.create.isError}
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
