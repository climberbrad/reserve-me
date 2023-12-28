import {Box, Drawer, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {SelectChangeEvent} from "@mui/material";
import {toEpocSecondsFromDate} from "../util/DateUtils.ts";
import {AssetFilter} from "../Types.ts";
import {AltRoute} from "@mui/icons-material";
import {drawerWidth} from "../App.tsx";

interface SidebarProps {
    handleFilter: (filter: AssetFilter) => void;
    filter: AssetFilter;
}

export function Sidebar(props: SidebarProps): React.ReactElement {

    const handleUpdateGuests = (event: SelectChangeEvent<number>) => {
        const guests = event.target.value;
        props.handleFilter({...props.filter, numPeople: !guests ? 0 : guests as number})
    }

    const handleUpdateStart = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.handleFilter({...props.filter, startDate: toEpocSecondsFromDate(event.target.value)})
    }

    const handleUpdateEnd = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.handleFilter({...props.filter, endDate: toEpocSecondsFromDate(event.target.value)})
    }

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Box sx={{display: 'flex'}}>
                <AltRoute sx={{color: '#2072f7', width: 52, height: 52}}/>
                <Typography sx={{paddingTop: 2.5, marginBottom: 8}} fontSize={16} fontFamily='sans-serif'>Find your next
                    adventure</Typography>
            </Box>
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
                    defaultValue={props.filter.startDate}
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
                    defaultValue={props.filter.endDate}
                    onChange={(e) => handleUpdateEnd(e)}
                />
            </FormControl>
            <FormControl required variant="standard" sx={{m: 1, minWidth: 120}}>
                <InputLabel id="trip-num-people-label">Guests</InputLabel>
                <Select
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
        </Drawer>
    )
}