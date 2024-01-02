import {
    Box,
    Button,
    Card,
    CardMedia,
    Divider,
    Rating,
    Typography
} from "@mui/material";
import useAssetHook from "../hooks/useAssetHook.ts";
import {useNavigate, useParams} from "react-router-dom";
import {AssetData, AssetFilter, Booking, Guest, TripData} from "../Types.ts";
import useTripHook from "../hooks/useTripHook.ts";
import {isValidTrip, newGuest, overlapsExisting} from "../util/RandomUtils.ts";
import GuestList from "../trips/GuestList.tsx";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from 'dayjs';

interface AssetDetailProps {
    trip: TripData;
    setTrip: (trip: TripData) => void;
}

export default function AssetDetail(props: AssetDetailProps): React.ReactElement {
    const tripHook = useTripHook();
    const assetHook = useAssetHook();
    const navigate = useNavigate();

    const {id} = useParams();
    if (!id) return <></>

    const {data, isLoading, isError} = assetHook.getAsset(id)

    if (isLoading) return <Typography color='#C0C0C0' fontSize={54}>Loading...</Typography>
    if (isError) return <Typography color='#C0C0C0' fontSize={36}>There was an error loading your data.</Typography>


    const handleReserve = (asset: AssetData, trip: TripData): void => {
        if (!trip.startDate || !trip.endDate || trip.guests.length === 0) {
            return
        }

        // single transaction create
        tripHook.create.mutateAsync({...trip, assetId: asset.id})
            .then((result) => {
                if (!result.id || !result.startDate || !result.endDate) {
                    return
                }

                const newBooking: Booking = {
                    tripId: result.id, // new tripId
                    startDate: result.startDate,
                    endDate: result.endDate
                }

                assetHook.update.mutate({...asset, bookings: [...asset.bookings, newBooking]})
                navigate('/trips')
            })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        data && handleReserve(data, props.trip)
    }

    const addOrUpdateGuest = (newGuewst: Guest) => {
        const index = props.trip.guests.findIndex((guest) => guest.id === newGuewst.id)
        const listCopy = [...props.trip.guests]

        index !== -1 ? listCopy[index] = newGuewst : listCopy.push(newGuewst)

        props.setTrip({...props.trip, guests: listCopy})
    }

    function disableExistingBookings(date: dayjs.Dayjs): boolean {
        if (data?.bookings.length === 0) return false

        const filter: AssetFilter = {startDate: date.unix(), endDate: date.unix(), numPeople: 0}
        return data?.bookings.find((booking) => overlapsExisting(booking, filter)) !== undefined
    }

    const updateStart = (value: dayjs.Dayjs | null) => {
        props.setTrip({...props.trip, startDate: value?.unix()})
    }

    const updateEnd = (value: dayjs.Dayjs | null) => {
        props.setTrip({...props.trip, endDate: value?.unix()})
    }

    return (
        <>
            <Typography marginY={1} align='left' color='#000000' fontSize={36}>Book your stay</Typography>
            <Typography marginY={1} align='left' color='#000000' fontSize={24}>{data?.name}</Typography>

            <Card sx={{width: 550}}>
                <CardMedia
                    component="img"
                    height="194"
                    image={data?.image}
                    alt="Paella dish"
                />
            </Card>
            <Typography marginBottom={2} align='left' color='#000000' fontSize={16}>"{data?.quote}"</Typography>
            <Typography align='left' color='#000000' fontSize={20}>Located in {data?.location}</Typography>
            <Typography align='left' color='#000000' fontSize={20}>Sleeps {data?.numSleeps} people</Typography>

            <Box
                sx={{display: 'flex', justifyContent: 'space-between', border: 1, borderRadius: 2, borderColor: '#c2baba', marginY: 2, padding: 1}}>
                <Box>
                    <Rating name="rating" value={data?.stars} readOnly/>
                    <Typography color='black' component="legend">{data?.reviews} Reviews</Typography>
                </Box>
                <Box sx={{marginX: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <Typography color='black' fontFamily='fantasy' component="legend">One of my favorite places to
                        stay!</Typography>
                    <Typography fontFamily='fantasy' color='black' component="legend">Home away from home, just
                        better.</Typography>
                </Box>
            </Box>

            <Typography sx={{marginTop: 8}} align='left' color='#000000' fontSize={12}>Featured in "Awesome places to
                stay"</Typography>
            <Divider sx={{marginY: 2}}/>
            <form onSubmit={handleSubmit}>
                <Typography sx={{marginY: 2}} align='left' color='#000000' fontSize={20}>Trip details</Typography>
                <Box sx={{gap: 2, display: 'flex'}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Start"
                            value={props.trip?.startDate && dayjs(props.trip?.startDate * 1000) || undefined}
                            onChange={updateStart}
                            disablePast
                            maxDate={props.trip?.endDate && dayjs(props.trip?.endDate * 1000) || undefined}
                            shouldDisableDate={disableExistingBookings}

                        />
                        <DatePicker
                            label="End"
                            disablePast
                            value={props.trip?.endDate && dayjs(props.trip?.endDate * 1000) || null}
                            minDate={props.trip?.startDate && dayjs(props.trip?.startDate * 1000) || undefined}
                            onChange={updateEnd}
                            shouldDisableDate={disableExistingBookings}

                        />
                    </LocalizationProvider>
                </Box>
                <Typography sx={{marginY: 2}} align='left' color='#6b6861' fontSize={14}>
                    Guests (max {data?.numSleeps})
                </Typography>
                <GuestList
                    maxGuests={data?.numSleeps || 0}
                    guestList={props.trip.guests.length === 0 ? [newGuest()] : props.trip.guests}
                    addOrUpdate={addOrUpdateGuest}/>
                <Box sx={{marginY: 4, display: 'flex'}}>
                    <Button disabled={!isValidTrip(props.trip)} type='submit' sx={{border: 1, borderRadius: 1}}>Book
                        It</Button>
                </Box>
            </form>
        </>)
}