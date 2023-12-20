import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {SelectChangeEvent} from "@mui/material";

export interface TripData {
    name: string;
    startDate: number;
    endDate: number;
    numPeople: number;
}

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
        const start = event.target.value

        const datePart: string[] = start.split('-')
        const year: number = Number(datePart[0])
        const month: number = Number(datePart[1])-1
        const day: number = Number(datePart[2])

        const utcDate = Date.UTC(year, month, day)
        props.handleUpdateTrip({...props.trip, startDate: utcDate})
    }

    const handleUpdateEnd = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const end = event.target.value

        const datePart: string[] = end.split('-')
        const year: number = Number(datePart[0])
        const month: number = Number(datePart[1])-1
        const day: number = Number(datePart[2])

        const utcDate = Date.UTC(year, month, day)
        props.handleUpdateTrip({...props.trip, endDate: utcDate})
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.handleUpdateTrip({...props.trip, name: event.target.value.trim()})
    }



    return (
        <>
            <TextField
                sx={{marginTop: 2, marginBottom: 8, marginLeft:1}}
                id="standard-basic"
                label={props.trip.name}
                variant="standard"
                onChange={(e) => handleNameChange(e)}
            />
            <FormControl variant="standard" sx={{m: 1, minWidth: 120, color: '#70d1da'}}>
                <TextField
                    variant="standard"
                    sx={{color: '#70d1da'}}
                    id="date"
                    label="Start"
                    type="date"
                    defaultValue="2024-12-15"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => handleUpdateStart(e)}
                />
            </FormControl>
            <FormControl variant="standard" sx={{m: 1, minWidth: 120, color: '#70d1da'}}>
                <TextField
                    variant="standard"
                    sx={{color: '#70d1da'}}
                    id="date"
                    label="End"
                    type="date"
                    defaultValue="2024-12-20"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => handleUpdateEnd(e)}
                />
            </FormControl>
            <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                <InputLabel id="trip-num-people-label">Guests</InputLabel>
                <Select
                    labelId="trip-num-people-label"
                    id="trip-num-people-select"
                    value={props.trip.numPeople}
                    onChange={(e) => handleUpdateGuests(e)}
                    label="Guests"
                >
                    <MenuItem value="">
                        <em>Any</em>
                    </MenuItem>
                    <MenuItem value={1}>One</MenuItem>
                    <MenuItem value={2}>Two</MenuItem>
                    <MenuItem value={3}>Three</MenuItem>
                    <MenuItem value={4}>Four</MenuItem>
                    <MenuItem value={5}>Five</MenuItem>
                    <MenuItem value={6}>Six</MenuItem>
                    <MenuItem value={7}>Seven</MenuItem>
                    <MenuItem value={8}>Eight</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}