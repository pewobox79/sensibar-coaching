import {create} from "zustand/index";


interface modalOpen {
    status: {search: boolean, treatmentForm: boolean, createModal: boolean}
    setSearchOpen: () => void;
    setSearchClose: () => void;
    setTreatmentFormOpen:()=>void;
    setTreatmentFormClose: () => void;
    setCreateModalOpen: () => void;
    setCreateModalClose: () => void;
}
export const useModalOpen = create<modalOpen>((set) => ({
    status: { search: false, treatmentForm: false, createModal:false },

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
    })),// Update treatmentForm to open

    setCreateModalOpen: () => set((state) => ({
        status: { ...state.status, createModal: true }
    })),

    // Update treatmentForm to close
    setCreateModalClose: () => set((state) => ({
        status: { ...state.status, createModal: false }
    })),
}));