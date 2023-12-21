import {sampleAssets} from "../SampleData.ts";
import {AssetData} from "../AssetCard.tsx";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

function wait (duration: number) {
    return new Promise(resolve => setTimeout(resolve, duration))
}
interface assetHookResponse {
    results: UseQueryResult<AssetData[]>
}
export default function useAssetHook (): assetHookResponse {

    const assetQuery = useQuery({
        queryKey: ['assets'],
        queryFn: () => wait(1000).then(() =>  [...sampleAssets])
    })

    return {results: assetQuery}
}