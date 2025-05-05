import {create} from "zustand";

interface tokenStore {
    token: string,
    setToken: (newData:string) => void,
    deleteToken: () => void
}

export const useTokenStore = create<tokenStore>((set) => ({
    token: "",

    setToken: (newData) => set(() => ({
        token:  newData
    })),

    // Update search to close
    deleteToken: () => set(() => ({
        token: ""
    })),


}));