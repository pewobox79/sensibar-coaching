import {create} from "zustand";
import {LocationType, SpeakerType} from "@/types/generalTypes";

type OrderTypes = {
    ticketId: string
    clientId: string
    clientName: string
    eventDate: string
    speaker?:SpeakerType[]
    eventLocation: LocationType
    ticketPrice: number
    eventName: string
    eventType: string
    billing: boolean
    billingAddress?: LocationType
    eventFormat: string
    rightOfWithdrawal: {
        hasAccepted: boolean,
        date: Date
    }
}

interface OrderStore {
    value: OrderTypes,
    addOrder: (order: OrderTypes) => void
    handleWithdrawal: () => void
    updateBillingAddress: (name: keyof LocationType, value: string) => void
    updateBillingState: ()=>void
}

const initValues: OrderTypes = {
    clientName: "",
    clientId: "",
    eventName: "",
    ticketId: "",
    speaker: [],
    ticketPrice: 0,
    eventDate: "",
    eventLocation: {
        city: "",
        zipCode: "",
        street: "",
        streetNumber: "",
        country: ""
    },
    eventType: "",
    billing: false,
    billingAddress: {
        street: "",
        city: "",
        zipCode: "",
        country: "Deutschland",
        streetNumber: "",
    },
    eventFormat: "",
    rightOfWithdrawal: {
        hasAccepted: false,
        date: new Date(),
    }
}

export const useOrderStore = create<OrderStore>((set) => ({
    value: initValues,
    addOrder: (order: OrderTypes) => {
        console.log("order", order)
        set(() => ({value: order}))
    },
    handleWithdrawal: () => {
        set((state) => ({value: {...state.value,
                rightOfWithdrawal: {
                    ...state.value.rightOfWithdrawal,
                    hasAccepted: !state.value.rightOfWithdrawal.hasAccepted
                }
            }
        }))
    },
    updateBillingAddress: (name: keyof LocationType, value: string) => {
        set((state) => ({
            value: {
                ...state.value,
                billingAddress: {
                    ...state.value.billingAddress,
                    [name]: value
                } as LocationType
            }
        }))
    },
    updateBillingState: ()=>{
        set((state) => ({
            value: {
                ...state.value,
                billing: !state.value.billing
            }
        }))
    }
}))