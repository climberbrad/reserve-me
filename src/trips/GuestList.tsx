import React from "react";
import {Guest} from "../Types.ts";
import GuestForm from "./GuestForm.tsx";

interface GuestListProps {
    guestList: Guest[];
    addOrUpdate: (guest: Guest) => void;
}

export default function GuestList(props: GuestListProps): React.ReactElement {

    return (<>
        {props.guestList.map((guest, index) =>
            <GuestForm key={guest.id}
                       guest={guest}
                       updateGuest={props.addOrUpdate}
                       canAddGuest={index === props.guestList.length-1}
            />)}
    </>)
}