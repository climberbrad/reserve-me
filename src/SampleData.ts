import {TripData} from "./Trip.tsx";
import {AssetData} from "./AssetCard.tsx";

export const EMPTY_TRIP: TripData = {
    id: undefined,
    name: 'New trip',
    startDate: undefined,
    endDate: undefined,
    numPeople: 0,
}

export const sampleTrips: TripData[] = []

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
    },
    {
        id: '4',
        startDate: Date.UTC(2024, 11,25),
        endDate: Date.UTC(2025, 0,31),
        name: 'Santa\'s House',
        location: 'North Pole',
        quote: 'elferific!',
        numSleeps: 8,
        available: true,
    },
    {
        id: '5',
        startDate: Date.UTC(2024, 11,24),
        endDate: Date.UTC(2024, 11,25),
        name: 'Grinch cave',
        location: 'Mount Crumpet',
        quote: 'BAAAAAAAAAAAAA!',
        numSleeps: 5,
        available: true,
    },
    {
        id: '6',
        startDate: Date.UTC(2024, 11,1),
        endDate: Date.UTC(2024, 11,31),
        name: 'Casa de Jordan',
        location: 'Boulder Home',
        quote: 'Home of the pumpkin roll!',
        numSleeps: 8,
        available: true,
    },
    {
        id: '7',
        startDate: Date.UTC(2024, 11,1),
        endDate: Date.UTC(2024, 11,31),
        name: 'Casa de lunes',
        location: 'Gold Canon',
        quote: 'Hot tub year round',
        numSleeps: 4,
        available: true,
    },
    {
        id: '8',
        startDate: Date.UTC(2024, 10,1),
        endDate: Date.UTC(2024, 11,31),
        name: 'Mi casa...',
        location: 'Austin getaway',
        quote: 'Rock\'n round the block',
        numSleeps: 6,
        available: true,
    },
    {
        id: '9',
        startDate: Date.UTC(2024, 9,1),
        endDate: Date.UTC(2024, 11,31),
        name: 'Soak\'n Safari',
        location: 'Glendwood Hot Springs',
        quote: 'Deep thoughts...',
        numSleeps: 2,
        available: true,
    }


]