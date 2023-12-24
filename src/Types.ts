export interface Booking {
    start: number;
    end: number;
}

export interface AssetData {
    id: string;
    name: string;
    location: string;
    quote: string;
    numSleeps: number;
    image: string;
    bookings: Booking[];
}

export interface TripData {
    id: string | undefined;
    name: string | undefined;
    startDate: number | undefined;
    endDate: number | undefined;
    numPeople: number;
    assetId: string | undefined;
}