import AssetCard from "./AssetCard.tsx";
import {Typography} from "@mui/material";
import {AssetData, TripData} from "./Types.ts";
import {isAvailable} from "./util/DateUtils.ts";

interface AssetListProps {
    isLoading: boolean,
    isError: boolean,
    error: Error | null,
    trip: TripData,
    assets: AssetData[],
    handleReserve: (asset: AssetData) => void,
}

export default function AssetList(props: AssetListProps): React.ReactElement {

    const filterNumPeople = (asset: AssetData, trip: TripData): boolean => {
        if (trip.numPeople > 0) {
            return asset.numSleeps >= trip.numPeople;
        }

        return true;
    }

    if (props.isLoading) return <Typography fontSize={54}>Loading...</Typography>
    if (props.isError) return <pre>{JSON.stringify(props.error)}</pre>

    return (
        <>
            {props.assets.filter((asset) => filterNumPeople(asset, props.trip))
                .filter((asset) => isAvailable(props.trip, asset))
                .map((asset) => <AssetCard key={asset.id} asset={asset} reserve={props.handleReserve}/>)
            }
        </>)
}