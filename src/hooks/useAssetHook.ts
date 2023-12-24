import {useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import {wait} from "../util/DateUtils.ts";
import {AssetData} from "../Types.ts";
import Api from "../Api.ts";

interface assetHookResponse {
    results: UseQueryResult<AssetData[]>,
    update: UseMutationResult<AssetData, Error, AssetData, unknown>,
    getAsset: (id: string) => UseQueryResult<AssetData, Error>,
}

export default function useAssetHook(): assetHookResponse {
    const queryClient = useQueryClient();
    const api = Api();

    const assetQuery = useQuery({
        queryKey: ['assets'],
        queryFn: () => wait(1000).then(api.getAssets)
    })

    const getAssetQuery = (id: string) => useQuery({
        queryKey: ["assets", id],
        queryFn: () => api.getAsset(id),
    })

    const updateAssetMutation = useMutation({
        mutationFn: (asset: AssetData) => wait(1000).then(() => api.updateAsset(asset)),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: ['assets']})
        },
    })

    return {results: assetQuery, update: updateAssetMutation, getAsset: getAssetQuery}
}