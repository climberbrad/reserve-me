import {AssetData, Booking, TripData} from "../Types.ts";

export function wait(duration: number) {
    return new Promise(resolve => setTimeout(resolve, duration))
}

export const formatDate = (utc: number): string => {
    return new Date(utc * 1000).toDateString()
}

export const isValidTrip = (trip: TripData): boolean => {
    return !!trip.name && !!trip.startDate && !!trip.endDate && trip.numPeople > 0
}

export function toEpocSecondsFromDate(hyphenDelimitedDate: string): number {
    if (!hyphenDelimitedDate.includes('-')) {
        return 0;
    }

    const datePart: string[] = hyphenDelimitedDate.split('-')
    const year: number = Number(datePart[0])
    const month: number = Number(datePart[1]) - 1
    const day: number = Number(datePart[2])

    const utcDate = Date.UTC(year, month, day)
    const utcOffsetHours = new Date().getTimezoneOffset() / 60

    return (utcDate + (utcOffsetHours * 60 * 60 * 1000)) / 1000
}

export function daysBetween(startEpocSec: number, endEpocSec: number): number {
    return ((endEpocSec - startEpocSec) / 60 / 60 / 24);
}

export function daysFromNow(epochSec: number): number {

    const utcOffsetHours = new Date().getTimezoneOffset() / 60

    const start = new Date(new Date().setHours(0, 0, 0, 0))
    const startOfDay = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())
    const nowOffset = (startOfDay + (utcOffsetHours * 60 * 60 * 1000)) / 1000

    return daysBetween(nowOffset, epochSec)
}


const isTripOverlappingBooking = (window: Booking, trip: TripData) : boolean => {
    if(!trip.startDate || !trip.endDate) return true

    return trip.startDate > window.endDate || trip.endDate < window.startDate;
}

export function isAvailable(trip: TripData, asset: AssetData): boolean {
    if(asset.bookings.length === 0) return true

    return asset.bookings.every((booking) => isTripOverlappingBooking(booking, trip))
}
