import {TripData} from "../Trip.tsx";

export function wait (duration: number) {
    return new Promise(resolve => setTimeout(resolve, duration))
}

export const formatDate = (utc: number): string => {
    return new Date(utc * 1000).toDateString()
}

export const isValidTrip = (trip: TripData): boolean => {
    return !!trip.name && !!trip.startDate && !!trip.endDate && trip.numPeople > 0
}

export function toEpocSecondsFromDate(hyphenDelimitedDate: string): number {
    if(!hyphenDelimitedDate.includes('-')) {
        return 0;
    }

    const datePart: string[] = hyphenDelimitedDate.split('-')
    const year: number = Number(datePart[0])
    const month: number = Number(datePart[1])-1
    const day: number = Number(datePart[2])

    const utcDate = Date.UTC(year, month, day)
    const utcOffsetHours = new Date().getTimezoneOffset() / 60

    return (utcDate + (utcOffsetHours * 60 * 60 * 1000)) / 1000
}