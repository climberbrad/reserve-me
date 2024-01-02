import React from "react";
import {Guest} from "../Types.ts";
import GuestForm from "./GuestForm.tsx";

interface GuestListProps {
    maxGuests: number;
    guestList: Guest[];
    addOrUpdate: (guest: Guest) => void;
}

export default function GuestList(props: GuestListProps): React.ReactElement {

    const canAddGuest = (guest: Guest, index: number): boolean => {
        return index === props.guestList.length-1
        && props.guestList.length < props.maxGuests
        && guest.firstName !== '' && guest.lastName !== ''
    }

    return (<>
        {props.guestList.map((guest, index) =>
            <GuestForm key={guest.id}
                       guest={guest}
                       addOrUpdate={props.addOrUpdate}
                       canAddGuest={canAddGuest(guest, index)}
            />)}
    </>)
}