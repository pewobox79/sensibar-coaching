import { slugify } from "./slugify"
const DOMAIN_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"
export const createWorkshopLink = (title: string, id:string |number):string => {
    return `${DOMAIN_URL}workshops/${ slugify(title) }/${ id }`
}

export function formatIsoDateToGerman(isoDate: string): string {
    if (!isoDate) return "";

    const [year, month, day] = isoDate.split("-");
    if (!year || !month || !day) return "";

    // Optional: basic sanity check (keeps output predictable)
    if (year.length !== 4 || month.length !== 2 || day.length !== 2) return "";

    return `${day}.${month}.${year}`;
}

// Example:
formatIsoDateToGerman("2026-03-26"); // "26.03.2026"