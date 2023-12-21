import {TripData} from "./Trip.tsx";
import {AssetData} from "./AssetCard.tsx";

export const EMPTY_TRIP: TripData = {
    name: 'New trip',
    startDate: undefined,
    endDate: undefined,
    numPeople: 0,
}

export const sampleAssets: AssetData[] = [
    {
        id: '1',
        startDate: Date.UTC(2024, 11,15),
        endDate: Date.UTC(2024, 11,20),
        name: 'Home on the Range',
        location: 'Ranch in Texas',
        quote: 'Oh give me a home...',
        numSleeps: 100,
        available: true,
    },
    {
        id: '1a',
        startDate: Date.UTC(2024, 11,15),
        endDate: Date.UTC(2024, 11,20),
        name: 'Between a rock and a hard place',
        location: 'Shed in an alley',
        quote: 'Help please!',
        numSleeps: 1,
        available: true,
    },
    {
        id: '2',
        startDate: Date.UTC(2024, 11,1),
        endDate: Date.UTC(2024, 11,15),
        name: 'Mountain Home',
        location: 'Colorado Ski Slopes',
        quote: 'Powder hungry',
        numSleeps: 6,
        available: true,
    },
    {
        id: '3',
        startDate: Date.UTC(2024, 6,15),
        endDate: Date.UTC(2024, 6,20),
        name: 'Beach House',
        location: 'Hawaii Big Island',
        quote: 'fun in the sun!',
        numSleeps: 2,
        available: true,
    }
]