import { slugify } from "./slugify"
const DOMAIN_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"
export const createWorkshopLink = (title: string, id:string |number):string => {
    return `${DOMAIN_URL}workshops/${ slugify(title) }/${ id }`
}