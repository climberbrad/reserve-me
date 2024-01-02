import React from "react";
import {FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {AssetFilter} from "../Types.ts";
import {toEpocSecondsFromDate} from "../util/DateUtils.ts";

interface AssetFilterCardProps {
    filter: AssetFilter;
    handleUpdateFilter: (filter: AssetFilter) => void;
}

export default function AssetFilterCard(props: AssetFilterCardProps): React.ReactElement {
    const handleUpdateGuests = (event: SelectChangeEvent<number>) => {
        const guests = event.target.value;
        props.handleUpdateFilter({...props.filter, numPeople: !guests ? 0 : guests as number})
    }

    const handleUpdateStart = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.handleUpdateFilter({...props.filter, startDate: toEpocSecondsFromDate(event.target.value)})
    }

    const handleUpdateEnd = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.handleUpdateFilter({...props.filter, endDate: toEpocSecondsFromDate(event.target.value)})
    }

    const MAX_GUESTS = 10

    const menuItems = (): React.ReactElement[] => {
        const stuff: React.ReactElement[] = []
        stuff.push(<MenuItem key={0} value={0}>Any</MenuItem>)

        for (let i = 0; i < MAX_GUESTS; i++) {
            stuff.push(<MenuItem key={i+1} value={i + 1}>{i + 1}</MenuItem>)
        }

        return stuff
    }

    return (
        <Grid zIndex={1} paddingTop={7} paddingBottom={1} bgcolor='#FFFFFF' container justifyContent="center"
              position='fixed' gap={12}>
            <FormControl variant="standard">
                <TextField
                    variant="standard"
                    id="startDate"
                    label="Start"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    defaultValue={props.filter.startDate}
                    onChange={(e) => handleUpdateStart(e)}
                />
            </FormControl>
            <FormControl variant="standard">
                <TextField
                    variant="standard"
                    id="endDate"
                    label="End"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    defaultValue={props.filter.endDate}
                    onChange={(e) => handleUpdateEnd(e)}
                />
            </FormControl>
            <FormControl variant="standard">
                <InputLabel
                    id="trip-num-people-label">Guests</InputLabel>
                <Select
                    labelId="trip-num-people-label"
                    id="trip-num-people-select"
                    value={props.filter.numPeople}
                    onChange={(e) => handleUpdateGuests(e)}
                    label="Guests"
                >
                    {menuItems()}
                </Select>
            </FormControl>
        </Grid>
    )
}