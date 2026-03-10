import {create} from "zustand";
import {LocationType} from "@/types/generalTypes";

type OrderTypes = {
    ticketId: string
    clientId: string
    clientName: string
    eventDate: string
    eventLocation: LocationType
    eventName: string
    eventType: string
    billing: boolean
    billingAddress?: LocationType
    eventFormat: string
}

interface OrderStore {
    value: OrderTypes,
    addOrder: (order: OrderTypes) => void
}

const initValues: OrderTypes = {
    clientName: "",
    clientId: "",
    eventName: "",
    ticketId: "",
    eventDate: "",
    eventLocation: {
        city: "",
        zipCode: "",
        street:"",
        number: "",
        country: ""
    },
    eventType: "",
    billing: false,
    eventFormat: ""
}

export const useOrderStore = create<OrderStore>((set) => ({
    value: initValues,
    addOrder: (order: OrderTypes) => {
        console.log("order", order)
        set(() => ({value: order}))
    }
}))