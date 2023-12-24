import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {SelectChangeEvent} from "@mui/material";
import {toEpocSecondsFromDate} from "./util/DateUtils.ts";
import {TripData} from "./Types.ts";

interface TripProps {
    handleUpdateTrip: (trip: TripData) => void;
    trip: TripData;
}

export function Trip(props: TripProps): React.ReactElement {

    const handleUpdateGuests = (event: SelectChangeEvent<number>) => {
        const guests = event.target.value;
        props.handleUpdateTrip({...props.trip, numPeople: !guests ? 0 : guests as number})
    }

    const handleUpdateStart = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.handleUpdateTrip({...props.trip, startDate: toEpocSecondsFromDate(event.target.value)})
    }

    const handleUpdateEnd = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.handleUpdateTrip({...props.trip, endDate: toEpocSecondsFromDate(event.target.value)})
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.handleUpdateTrip({...props.trip, name: event.target.value})
    }

    return (
        <>
            <TextField
                required
                sx={{marginTop: 2, marginBottom: 8, marginLeft:1}}
                id="tripName"
                label='Trip name'
                placeholder='New trip'
                defaultValue={props.trip.name}
                variant="standard"
                onChange={(e) => handleNameChange(e)}
            />
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
                    defaultValue={props.trip.startDate || ''}
                    onChange={(e) => handleUpdateStart(e)}
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
                    defaultValue={props.trip.endDate || ''}
                    onChange={(e) => handleUpdateEnd(e)}
                />
            </FormControl>
            <FormControl required variant="standard" sx={{m: 1, minWidth: 120}}>
                <InputLabel id="trip-num-people-label">Guests</InputLabel>
                <Select
                    labelId="trip-num-people-label"
                    id="trip-num-people-select"
                    value={props.trip.numPeople}
                    onChange={(e) => handleUpdateGuests(e)}
                    label="Guests"
                >
                    <MenuItem value={0}>Any</MenuItem>
                    <MenuItem value={1}>One</MenuItem>
                    <MenuItem value={2}>Two</MenuItem>
                    <MenuItem value={3}>Three</MenuItem>
                    <MenuItem value={4}>Four</MenuItem>
                    <MenuItem value={5}>Five</MenuItem>
                    <MenuItem value={6}>Six</MenuItem>
                    <MenuItem value={7}>Seven</MenuItem>
                    <MenuItem value={8}>Eight</MenuItem>
                    <MenuItem value={9}>Nine</MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}