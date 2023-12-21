import useAssetHook from "./hooks/useAssetHook.ts";
import AssetCard, {AssetData} from "./AssetCard.tsx";
import {Typography} from "@mui/material";
import {TripData} from "./Trip.tsx";

export default function AssetList(trip: TripData): React.ReactElement {
    const assetHook = useAssetHook();

    const handleReserve = (asset: AssetData) => {
        console.log('Reserve', asset.name)
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

    if (assetHook.results.isLoading) return <Typography fontSize={54}>Loading...</Typography>
    if (assetHook.results.isError) return <pre>{JSON.stringify(assetHook.results.error)}</pre>

    return (
        <>
            {assetHook.results.data?.filter((asset) => filterNumPeople(asset, trip))
                .filter((asset) => filterStart(asset, trip))
                .filter((asset) => filterEnd(asset, trip))
                .map((asset) => <AssetCard key={asset.id} asset={asset} reserve={handleReserve}/>)
            }
        </>)
}