import {sampleAssets} from "../SampleData.ts";
import {AssetData} from "../AssetCard.tsx";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {wait} from "./HookUtils.ts";
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