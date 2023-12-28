export interface Booking {
    tripId: string;
    startDate: number;
    endDate: number;
}

export interface Guest {
    id: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
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
    startDate: number | undefined;
    endDate: number | undefined;
    guests: Guest[];
    assetId: string | undefined;
}

export interface AssetFilter {
    startDate: number | undefined;
    endDate: number | undefined;
    numPeople: number;
}

export const EMPTY_ASSET_FILTER = {
    startDate: undefined,
    endDate: undefined,
    numPeople: 0,
}

export const EMPTY_TRIP: TripData = {
    id: undefined,
    startDate: undefined,
    endDate: undefined,
    guests: [],
    assetId: undefined,
}