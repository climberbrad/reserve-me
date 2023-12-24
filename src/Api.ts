import axios from "axios";
import {AssetData, TripData} from "./Types.ts";

interface ApiResponse {
    getAssets: () => Promise<AssetData[]>,
    getAsset: (id: string) => Promise<AssetData>
    updateAsset: (asset: AssetData) => Promise<AssetData>
    getTrips: () => Promise<TripData[]>
    createTrip: (trip: TripData) => Promise<TripData>
}

export default function Api(): ApiResponse {
    async function getAssets(): Promise<AssetData[]> {
        const res = await axios
            .get("http://localhost:3000/assets", {params: {_sort: "id"}});
        return res.data;
    }

    function getAsset(id: string): Promise<AssetData> {
        return axios.get(`http://localhost:3000/assets/${id}`).then(res => res.data)
    }

    async function updateAsset(asset: AssetData): Promise<AssetData> {
        const res = await axios
            .put(`http://localhost:3000/assets/${asset.id}`, {
                ...asset,
            });
        return res.data;
    }

    async function getTrips(): Promise<TripData[]> {
        const res = await axios
            .get("http://localhost:3000/trips", {params: {_sort: "id"}});
        return res.data;
    }

    async function createTrip(trip: TripData): Promise<TripData> {
        const res = await axios
            .post("http://localhost:3000/trips", {
                ...trip,
                id: crypto.randomUUID(),
            });
        return res.data;
    }
    return {getAssets, getAsset, updateAsset, getTrips, createTrip}
}