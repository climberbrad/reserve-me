import {AssetData, AssetFilter, Booking, TripData} from "../Types.ts";

export const formatDate = (utc: number): string => {
    return new Date(utc * 1000).toDateString()
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

const overlapsExisting = (window: Booking, filter: AssetFilter): boolean => {
    const testStart = filter.startDate || 0
    const testEnd = filter.endDate || 0

    return testStart >= window.startDate && testStart <= window.endDate
    || testEnd >= window.startDate && testEnd <= window.endDate
    || window.startDate >= testStart && window.startDate <= testEnd
    || window.endDate >= testStart && window.endDate <= testEnd
}

export function isAvailable(filter: AssetFilter, asset: AssetData): boolean {
    if (asset.bookings.length === 0) return true
    if (!filter.startDate && !filter.endDate) return true

    const overlaps = asset.bookings.every((booking) => overlapsExisting(booking, filter))

    return !overlaps
}

export const isValidTrip = (trip: TripData): boolean => {
    return !!trip.endDate && !!trip.startDate && trip.guests.length > 0
}
