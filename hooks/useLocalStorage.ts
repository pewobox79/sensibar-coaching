'use client'
import {useState} from "react";

export function useLocalStorage(key:string, initialValue: unknown){



        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [value, setValue] = useState(() => {

            if (typeof window === "undefined") {
                return initialValue;
            }
            const storedValue = window.localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : initialValue;
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