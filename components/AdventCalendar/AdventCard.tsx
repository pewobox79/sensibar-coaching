'use client'
import {CSSProperties} from "react";

import React, {useState} from "react";
import {isReadyToOpen} from "@/utils/adventCalendarHelper";
import {number} from "yup";
import AdventCardOpen from "@/components/AdventCalendar/AdventCardOpen";
import {useLocalStorage} from "@/hooks/useLocalStorage";

const decorationSets = [
    {
        flakes: [
            {top: "8%", right: "10%", fontSize: "42px"},
            {top: "55%", left: "7%", fontSize: "28px"},
        ],
    },
    {
        flakes: [
            {top: "4%", left: "22%", fontSize: "36px"},
            {bottom: "5%", right: "12%", fontSize: "26px"},
        ],
    },
    {
        flakes: [
            {top: "5%", left: "8%", fontSize: "38px"},
            {bottom: "8%", right: "30%", fontSize: "35px"},
        ],
    },
    {
        flakes: [
            {top: "7%", left: "35%", fontSize: "30px"},
            {bottom: "9%", left: "14%", fontSize: "28px"},
        ],
    },
];

function Snowflake({style}: { style: CSSProperties }) {
    return (
        <span className="snowflake" style={ style }>
      ❄
    </span>
    );
}

function SnowDots() {
    return (
        <>
            <span className="snowDot dot1"/>
            <span className="snowDot dot2"/>
            <span className="snowDot dot3"/>
            <span className="snowDot dot4"/>
            <span className="snowDot dot5"/>
            <span className="snowDot dot6"/>
            <span className="snowDot dot7"/>
            <span className="snowDot dot8"/>
        </>
    );
}

export function AdventCard({day, variant, index}: { day: number, variant?: string, index: number }) {

    const {value, setStoredValue} = useLocalStorage("adventCalendar_values", [])
    const decorations = decorationSets[index % decorationSets.length];
    const [open, setOpen] = useState(false );
    const [message, setMessage] = useState(false)

    const isOpened = value?.includes(day);
    function handleOpen() {
        if (isReadyToOpen(day)) {
            if(value.includes(day)) return
            const updatedDays = value ? [...value, day]: [day]
            setStoredValue(updatedDays)
            setOpen(true)
            return
        }

        setMessage(true)
    }

    return (
        <button
            className={ `adventCard ${
                variant === "accent" ? "adventCardAccent" : ""
            } ${ open || isOpened ? "adventCardOpened" : "" }` }
            type="button"
            onClick={ handleOpen }
        >

            <div className="decorations">
                { decorations.flakes.map((flake, flakeIndex) => (
                    <Snowflake key={ flakeIndex } style={ flake }/>
                )) }
                <SnowDots/>
            </div>

            { message ? <p>Kalender kann erst am { day }. Dezember geöffnet werden</p> :
                isOpened || open ? <AdventCardOpen day={day} /> : <span className="dayNumber">{ day }</span> }
        </button>
    );
}