import {create} from "zustand";
import * as lodash from 'lodash';

// Define types for each part of the client data structure
interface PersonalData {
    firstname: string;
    lastname: string;
    birthdate: string;
    gender: string;
    id?: string;
}

interface Contact {
    phone: string;
    email: string;
    id?: string
}

interface Address {
    street: string;
    streetNumber: string;
    city: string;
    country: string;
    zipCode: string;
    id?: string
}

interface ConditionStatus {
    sensitiveStatus: boolean;
}

export type TreatmentNotes = {
    id: string |number;
    documentId: string;
    title: string;
    details: string;
    type: string;
    location: string;
    createdAt: string;      // ISO date format (e.g., "2024-10-28T12:17:53.516Z")
    updatedAt: string;      // ISO date format
    publishedAt: string;    // ISO date format
    locale: string | null;
};

export type ClientData = {
    personalData: PersonalData;
    isPatient: boolean;
    documentId?: string;
    contact: Contact[];
    address: Address;
    workshops: string[]; // Assuming workshops is an array of strings, update if needed
    condition_status: ConditionStatus;
    treatment_notes: TreatmentNotes[];
    selectedClientDetails: {
        title: string;
        details: string;
        type: string;
        documentId: string
    }
}

type SelectedClientDetails = {
    title: string;
    details: string;
    type: string;
    documentId: string;
};
// Define the Zustand store interface
interface ClientStore {
    clientData: ClientData;
    setClientData: (newData: Partial<ClientData>) => void;
    resetClientData: () => void;
    updateSelectedClientDetails: (updatedFields: Partial<SelectedClientDetails>) => void;
}


const defaultClientValues = {
    personalData:{
        firstname: "",
        lastname: "",
        birthdate: "",
        gender:""
    },
    contact: [{
        phone: "",
        email: "",
    }],
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
    },
    treatment_notes: [],
    isPatient:false,
    selectedClientDetails: {
        title:"",
        details: "",
        type: "",
        documentId: ""
    }
}
export const useClientStore = create<ClientStore>((set) => ({
    clientData: defaultClientValues,

    // Update all data at once
    setClientData: (newData) => set((state) => ({
        clientData: lodash.merge({}, state.clientData, newData)
    })),
    resetClientData: () => set(() => ({
        clientData: defaultClientValues
    })),
    updateSelectedClientDetails: (updatedFields) =>
        set((state) => ({
            clientData: {
                ...state.clientData,
                selectedClientDetails: {
                    ...state.clientData.selectedClientDetails,
                    ...updatedFields,
                },
            },
        })),
}))