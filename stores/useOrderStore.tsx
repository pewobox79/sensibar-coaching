import {create} from "zustand";
import {LocationType, OrderStore, OrderTypes} from "@/types/generalTypes";



export const initOrderValues: OrderTypes = {
    clientName: "",
    clientId: "",
    eventName: "",
    workshopId: "",
    contactEmail: "",
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
    value: initOrderValues,
    resetOrderData: () => set(() => ({value: initOrderValues})),
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