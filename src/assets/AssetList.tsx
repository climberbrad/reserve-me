import AssetCard from "./AssetCard.tsx";
import {Typography} from "@mui/material";
import {AssetData, AssetFilter} from "../Types.ts";
import {isAvailable} from "../util/DateUtils.ts";

interface AssetListProps {
    isLoading: boolean,
    isError: boolean,
    error: Error | null,
    filter: AssetFilter,
    assets: AssetData[],
}

export default function AssetList(props: AssetListProps): React.ReactElement {

    const filterNumPeople = (asset: AssetData, filter: AssetFilter): boolean => {
        if (filter.numPeople > 0) {
            return asset.numSleeps >= props.filter.numPeople;
        }
        return true;
    }

    if (props.isLoading) return <Typography fontSize={54}>Loading...</Typography>
    if (props.isError) return <pre>{JSON.stringify(props.error)}</pre>

    return (
        <>
            {props.assets
                .filter((asset) => filterNumPeople(asset, props.filter))
                .filter((asset) => isAvailable(props.filter, asset))
                .map((asset) => <AssetCard key={asset.id} {...asset}/>)
            }
        </>)
}