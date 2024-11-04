import {create} from "zustand";

// Define types for each part of the client data structure
interface PersonalData {
    firstname: string;
    lastname: string;
    birthdate: string;
    gender: string;
}

interface Contact {
    phone: string;
    email: string;
}

interface Address {
    street: string;
    streetNumber: string;
    city: string;
    country: string;
    zipCode: string;
}

interface ConditionStatus {
    sensitiveStatus: boolean;
}

interface ClientData {
    personalData: PersonalData;
    contact: Contact;
    address: Address;
    workshops: string[]; // Assuming workshops is an array of strings, update if needed
    condition_status: ConditionStatus;
}

// Define the Zustand store interface
interface ClientStore {
    clientData: ClientData;
    setClientData: (newData: Partial<ClientData>) => void;
    resetClientData: () => void;
}


const defaultClientValues = {
    personalData:{
        firstname: "",
        lastname: "",
        birthdate: "",
        gender:""
    },
    contact: {
        phone: "",
        email: "",
    },
    address: {
        street: "",
        streetNumber: "",
        city: "",
        country: "",
        zipCode: "",
    },
    workshops:[],
    condition_status: {
        sensitiveStatus: false,
    }
}
export const useClientStore = create<ClientStore>((set) => ({
    clientData: defaultClientValues,

    // Update all data at once
    setClientData: (newData) => set((state) => ({
        clientData: {
            ...state.clientData,
            ...newData
        }
    })),
    resetClientData: () => set(() => ({
        clientData: defaultClientValues
    })),
}))