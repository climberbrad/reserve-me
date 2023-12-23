import axios from "axios";
import {TripData} from "./Trip.tsx";
import {AssetData} from "./AssetCard.tsx";

export function getAssets(): Promise<AssetData[]> {
    return axios
        .get("http://localhost:3000/assets", { params: { _sort: "id" } })
        .then(res => res.data)
}

export function getTrips(): Promise<TripData[]> {
    return axios
        .get("http://localhost:3000/trips", { params: { _sort: "id" } })
        .then(res => res.data)
}

export function createTrip(trip: TripData): Promise<TripData> {
    return axios
        .post("http://localhost:3000/trips", {
            ...trip,
            id: crypto.randomUUID(),
        })
        .then(res => res.data)
}