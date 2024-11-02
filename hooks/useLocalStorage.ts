'use client'
import {useState} from "react";

export function useLocalStorage(key:string){

    if (typeof window !== "undefined") {

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [value, setValue] = useState(() => {
            const storedValue = window.localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : null;
        })


        const setStoredValue = (newValue: unknown) => {

            setValue(newValue);
            window.localStorage.setItem(key, JSON.stringify(newValue));
        }

        const deleteLocalStorage = () => {
            setValue(null);
            window.localStorage.removeItem(key);
        }
        return {value, setStoredValue, deleteLocalStorage}
    }

}