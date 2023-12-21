import useAssetHook from "./hooks/useAssetHook.ts";
import AssetCard, {AssetData} from "./AssetCard.tsx";
import {Typography} from "@mui/material";
import {TripData} from "./Trip.tsx";

interface AssetListProps {
    trip: TripData,
    handleReserve:(asset: AssetData) => void,
}

export default function AssetList(props: AssetListProps): React.ReactElement {
    const assetHook = useAssetHook();

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
            {assetHook.results.data?.filter((asset) => filterNumPeople(asset, props.trip))
                .filter((asset) => filterStart(asset, props.trip))
                .filter((asset) => filterEnd(asset, props.trip))
                .map((asset) => <AssetCard key={asset.id} asset={asset} reserve={props.handleReserve}/>)
            }
        </>)
}