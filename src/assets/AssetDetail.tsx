import React, {useState} from "react";
import {
    Box,
    Button,
    Card,
    CardMedia,
    Divider,
    FormControl,
    Rating,
    TextField,
    Typography
} from "@mui/material";
import useAssetHook from "../hooks/useAssetHook.ts";
import {useNavigate, useParams} from "react-router-dom";
import {AssetData, Booking, EMPTY_TRIP, Guest, TripData} from "../Types.ts";
import useTripHook from "../hooks/useTripHook.ts";
import {isValidTrip, toEpocSecondsFromDate} from "../util/DateUtils.ts";
import GuestList from "../trips/GuestList.tsx";

export default function AssetDetail(): React.ReactElement {
    const tripHook = useTripHook();
    const assetHook = useAssetHook();

    const {id} = useParams();
    const navigate = useNavigate();

    const [trip, setTrip] = useState<TripData>(EMPTY_TRIP);

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

        data && handleReserve(data, trip)
    }

    const handleUpdateStart = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTrip({...trip, startDate: toEpocSecondsFromDate(event.target.value)})
    }

    const handleUpdateEnd = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTrip({...trip, endDate: toEpocSecondsFromDate(event.target.value)})
    }

    const addOrUpdateGuest = (newGuewst: Guest) => {
        if (data?.numSleeps === trip.guests.length) return

        const index = trip.guests.findIndex((guest) => guest.id === newGuewst.id)
        const listCopy = [...trip.guests]

        index !== -1 ? listCopy[index] = newGuewst : listCopy.push(newGuewst)

        setTrip({...trip, guests: listCopy})
    }

    return (<>
        <Typography marginY={1} align='left' color='#000000' fontSize={36}>{data?.name}</Typography>

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
            <Typography sx={{marginY: 2}} align='left' color='#000000' fontSize={20}>Book your stay</Typography>
            <Box sx={{gap: 2, display: 'flex'}}>
                <FormControl variant="standard" sx={{m: 1, minWidth: 120, color: '#70d1da'}}>
                    <TextField
                        required
                        variant="standard"
                        sx={{color: '#70d1da'}}
                        id="startDate"
                        label="Start"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        defaultValue={trip.startDate || ''}
                        onChange={handleUpdateStart}
                    />
                </FormControl>
                <FormControl variant="standard" sx={{m: 1, minWidth: 120, color: '#70d1da'}}>
                    <TextField
                        required
                        variant="standard"
                        sx={{color: '#70d1da'}}
                        id="endDate"
                        label="End"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        defaultValue={trip.startDate || ''}
                        onChange={handleUpdateEnd}
                    />
                </FormControl>
            </Box>
            <Typography sx={{marginY: 2}} align='left' color='#6b6861' fontSize={12}>
                Guests (max {data?.numSleeps})
            </Typography>
            <GuestList guestList={trip.guests.length === 0 ? [{id: crypto.randomUUID(), firstName: '', lastName: ''}] : trip.guests} addOrUpdate={addOrUpdateGuest}/>
            <Box sx={{marginY: 4, display: 'flex'}}>
                <Button disabled={!isValidTrip(trip)} type='submit' sx={{border: 1, borderRadius: 1}}>Book It</Button>
            </Box>
        </form>
    </>)
}