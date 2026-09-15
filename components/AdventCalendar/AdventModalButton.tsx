'use client'

import AdventCalenderSubscription, {
    LOCAL_STORAGE_KEY_ADVENT_SUBSCRIPTION
} from "@/components/AdventCalendar/AdventCalenderSubscription";
import {useState} from "react";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import Button from "@/components/global/Button";


const AdventModalButton = () => {

    const {value: hasSubscribed} = useLocalStorage(LOCAL_STORAGE_KEY_ADVENT_SUBSCRIPTION, false);
    const [isOpened, setIsOpened] = useState(!hasSubscribed||false);

    function toggleModal() {
        setIsOpened(!isOpened);
    }
    return (
        <>
            <Button type="submit" action={toggleModal} title={"Kalender abonnieren"}/>
            <AdventCalenderSubscription isOpened={isOpened} handleModal={toggleModal} /></>
    )
}

export default AdventModalButton