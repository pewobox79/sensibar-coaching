import { Temporal } from "@js-temporal/polyfill";

export const isReadyToOpen = (day: number) => {
    if(!day) return false
    const today = Temporal.Now.plainDateISO();
    const DECEMBER = 12;
    return today.month === DECEMBER && today.day >= day;
};