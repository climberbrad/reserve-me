import {Box, Button, TextField} from "@mui/material";
import {Guest} from "../Types.ts";
import React from "react";

interface GuestFormProps {
    guest: Guest;
    updateGuest: (guest: Guest) => void;
    canAddGuest: boolean;
}

export default function GuestForm(props: GuestFormProps): React.ReactElement {

    const handleChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fname = event.target.value
        props.updateGuest({...props.guest, firstName: fname})
    }

    const handleChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const lname = event.target.value
        props.updateGuest({...props.guest, lastName: lname})
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Box sx={{display: 'flex', gap: 1, marginTop: 2}}>
                <TextField
                    required
                    variant="standard"
                    sx={{color: '#70d1da'}}
                    id="firstName"
                    label="first name"
                    type="string"
                    value={props.guest.firstName}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleChangeFirstName}
                />
                <TextField
                    required
                    variant="standard"
                    sx={{color: '#70d1da'}}
                    id="lastName"
                    label="last name"
                    type="string"
                    value={props.guest.lastName}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleChangeLastName}
                />
                {props.canAddGuest && (
                    <Button sx={{fontSize: 20, marginTop: 2}} disabled={false} size='small'
                            onClick={() => props.updateGuest({id: crypto.randomUUID(), firstName: '', lastName: ''})}
                            aria-label='Add Guest'>+
                    </Button>
                )}
            </Box>
        </Box>
    )
}