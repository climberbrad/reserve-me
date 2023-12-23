import {sampleAssets} from "../SampleData.ts";
import {AssetData} from "../AssetCard.tsx";
import {useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import {wait} from "./HookUtils.ts";
import {getAsset, getAssets} from "../Api.ts";

interface assetHookResponse {
    results: UseQueryResult<AssetData[]>,
    update: UseMutationResult<void, Error, AssetData, unknown>,
    getAsset: (id: string) => UseQueryResult<AssetData, Error>,
}

export default function useAssetHook(): assetHookResponse {
    const queryClient = useQueryClient();

    const assetQuery = useQuery({
        queryKey: ['assets'],
        queryFn: () => wait(1000).then(getAssets)
    })

    const getAssetQuery = (id: string) => useQuery({
        queryKey: ["assets", id],
        queryFn: () => getAsset(id),
    })

    const updateAsset = useMutation({
        mutationFn: (asset: AssetData) => wait(1000).then(() => {
            const index: number = sampleAssets.findIndex((el) => el.id === asset.id)
            sampleAssets[index] = asset;
        }),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: ['assets']})
        },
    })

    return {results: assetQuery, update: updateAsset, getAsset: getAssetQuery}
}