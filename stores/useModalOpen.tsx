import {create} from "zustand/index";


interface modalOpen {
    status: {search: boolean, treatmentForm: boolean}
    setSearchOpen: () => void;
    setSearchClose: () => void;
    setTreatmentFormOpen:()=>void;
    setTreatmentFormClose: () => void;
}
export const useModalOpen = create<modalOpen>((set) => ({
    status: { search: false, treatmentForm: false },

    // Update search to open
    setSearchOpen: () => set((state) => ({
        status: { ...state.status, search: true }
    })),

    // Update search to close
    setSearchClose: () => set((state) => ({
        status: { ...state.status, search: false }
    })),

    // Update treatmentForm to open
    setTreatmentFormOpen: () => set((state) => ({
        status: { ...state.status, treatmentForm: true }
    })),

    // Update treatmentForm to close
    setTreatmentFormClose: () => set((state) => ({
        status: { ...state.status, treatmentForm: false }
    })),
}));