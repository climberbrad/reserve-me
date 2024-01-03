import './App.css'
import {useState} from "react";
import {Box} from "@mui/material";
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
import AssetFilterCard from "./assets/AssetFilterCard.tsx";

export const drawerWidth = 250;

// TODO
// [X] Optimistic updates
// [X] Backend API
// [X] test API errors
// [ ] Hosting
// [ ] Endless scroll
// [ ] rename API to server
// [ ] Google maps

// ideas
// [X] do not allow users to pick booked dates in details page
// [ ] use material themes rather than hard coded colors
// [ ] fit to screen on resize
// [X] filters work on trips and asset list but not on asset-detail page
// [ ] add graphs for usage (# reserved/month) ($spent/month) (#people/reservation) (locations)
// [ ] make [directions] work with Google Maps
// [ ] remove/add Profile and Account

function App() {
    const [filter, setFilter] = useState<AssetFilter>(DEFAULT_FILTER)

    const tripHook = useTripHook();
    const assetHook = useAssetHook();

    return (
        <>
            <HeaderBar/>
            <Routes>
                <Route path="*"
                       element={
                           <>
                               <AssetFilterCard filter={filter} handleUpdateFilter={setFilter}/>
                               <AssetList
                                   isLoading={assetHook.results.isLoading}
                                   assets={assetHook.results.data || []}
                                   isError={assetHook.results.isError}
                                   error={assetHook.results.error}
                                   filter={filter}/>
                           </>
                       }
                />
                <Route
                    key={'/trips/'}
                    path={'/trips/'}
                    element={
                        <Box sx={{marginTop: 8}}>
                            <Trips
                                trips={tripHook.results.data || []}
                                isLoading={tripHook.create.isPending || tripHook.results.isLoading}
                                isError={tripHook.create.isError || tripHook.results.isError}
                                error={tripHook.create.error}
                            />
                        </Box>
                    }/>
                <Route key={'/asset-detail'}
                       path={'/asset-detail/:id'}
                       element={<Box sx={{marginTop: 8}}><AssetDetail /></Box>}
                />
            </Routes>
        </>
    )
}

export default App
