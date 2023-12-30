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
    startDate: number;
    endDate: number;
    numPeople: number;
}

export const DEFAULT_FILTER: AssetFilter = {
    startDate: Date.now(),
    endDate: Math.max(),
    numPeople: 0,
}

export const EMPTY_TRIP: TripData = {
    id: undefined,
    startDate: undefined,
    endDate: undefined,
    guests: [],
    assetId: undefined,
}