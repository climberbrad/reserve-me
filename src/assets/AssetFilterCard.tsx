import React from "react";
import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import {AssetFilter} from "../Types.ts";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface AssetFilterCardProps {
    filter: AssetFilter;
    handleUpdateFilter: (filter: AssetFilter) => void;
}

export default function AssetFilterCard(props: AssetFilterCardProps): React.ReactElement {
    const MAX_GUESTS = 10
    const FILTER_WIDTH = 120

    const handleUpdateGuests = (event: SelectChangeEvent<number>) => {
        const guests = event.target.value;
        props.handleUpdateFilter({...props.filter, numPeople: !guests ? 0 : guests as number})
    }

    const updateStart = (value: dayjs.Dayjs | null) => {
        if (!value) return

        props.handleUpdateFilter({...props.filter, startDate: value?.unix()})
    }

    const updateEnd = (value: dayjs.Dayjs | null) => {
        if (!value) return

        props.handleUpdateFilter({...props.filter, endDate: value?.unix()})
    }

    const menuItems = (): React.ReactElement[] => {
        const stuff: React.ReactElement[] = []
        stuff.push(<MenuItem key={0} value={0}>Any</MenuItem>)

        for (let i = 0; i < MAX_GUESTS; i++) {
            stuff.push(<MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>)
        }

        return stuff
    }

    return (
        <Grid zIndex={1} paddingTop={6} paddingBottom={1} bgcolor='#FFFFFF' container justifyContent="center"
              position='fixed' gap={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Start"
                        value={props.filter.startDate && dayjs(props.filter.startDate * 1000) || undefined}
                        onChange={updateStart}
                        disablePast
                        sx={{width: FILTER_WIDTH}}
                        maxDate={props.filter.endDate && dayjs(props.filter.endDate * 1000) || undefined}
                        slotProps={{ textField: { variant: 'standard', } }}

                    />
                    <DatePicker
                        label="End"
                        disablePast
                        value={props.filter.endDate && dayjs(props.filter.endDate * 1000) || null}
                        minDate={props.filter.startDate && dayjs(props.filter.startDate * 1000) || undefined}
                        onChange={updateEnd}
                        sx={{width: FILTER_WIDTH}}
                        slotProps={{ textField: { variant: 'standard'} }}

                    />
                </LocalizationProvider>
            <FormControl variant="standard">
                <InputLabel
                    id="trip-num-people-label">Guests</InputLabel>
                <Select
                    labelId="trip-num-people-label"
                    id="trip-num-people-select"
                    value={props.filter.numPeople}
                    sx={{width: FILTER_WIDTH}}
                    onChange={(e) => handleUpdateGuests(e)}
                    label="Guests"
                >
                    {menuItems()}
                </Select>
            </FormControl>
        </Grid>
    )
}