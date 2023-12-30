import React from "react";
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {AssetFilter} from "../Types.ts";
import {toEpocSecondsFromDate} from "../util/DateUtils.ts";

interface AssetFilterCardProps {
    filter: AssetFilter;
    handleUpdateFilter: (filter: AssetFilter) => void;
}

export default function AssetFilterCard(props: AssetFilterCardProps) : React.ReactElement {
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

    return (
        <Box sx={{display: 'flex', gap: 6, marginLeft: -24}}>
            <FormControl variant="standard" sx={{marginTop: 3.5}}>
                <TextField
                    sx={{ label: {color: '#ffffff'}, input: { color: '#ffffff' } }}
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
            <FormControl variant="standard" sx={{marginTop: 3.5}}>
                <TextField
                    sx={{ label: {color: '#ffffff'}, input: { color: '#ffffff' } }}
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
            <FormControl variant="standard" sx={{marginTop: 3.5}}>
                <InputLabel
                    sx={{ color: '#ffffff' }}
                    id="trip-num-people-label">Guests</InputLabel>
                <Select
                    sx={{ color: '#ffffff' }}
                    labelId="trip-num-people-label"
                    id="trip-num-people-select"
                    value={props.filter.numPeople}
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
        </Box>
    )
}