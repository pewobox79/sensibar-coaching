'use client'

import styles from '@/styles/Client.module.css'


import {useClientStore} from "@/stores/useClientStore";
import DatePicker from "react-datepicker";
import {formatDateToStrapiFormat} from "@/lib/strapi/generalHelper";

type ContactEditItemType = {
    value: string,
    name: string,
    type?: "text",
    property: "personalData" | "contact" | "address"
}
const EditItem = ({value, name, property}: ContactEditItemType) => {

    let placeholderValue: string = ""
    let dateFormatForDatePicker
    switch (name) {
        case "firstname":
            placeholderValue = "Vorname"
            break;
        case "lastname":
            placeholderValue = "Nachname"
            break;
        case "phone":
            placeholderValue = "Telefonnummer"
            break;
        case "email":
            placeholderValue = "Email"
            break;
        case "street":
            placeholderValue = "Straße"
            break;
        case "streetNumber":
            placeholderValue = "Hausnummer"
            break;
        case "zipCode":
            placeholderValue = "PLZ"
            break;
        case "city":
            placeholderValue = "Stadt"
            break;
        case "country":
            placeholderValue = "Land"
            break;
        case "birthdate":
            placeholderValue = "Geburtsdatum"
            dateFormatForDatePicker = new Date(value)
            break;
        default:
            placeholderValue = name
    }

    function handleChange(e: { target: { name: string, value: string } }) {

        useClientStore.getState().setClientData({
            ...useClientStore.getState().clientData,
            [`${ property }`]: {[e.target.name]: e.target.value}
        })

    }

    function handleDateChange(date: unknown) {

        const formatedDate = formatDateToStrapiFormat(date as string)
        useClientStore.getState().setClientData({
            personalData: {
                ...useClientStore.getState().clientData.personalData,
                birthdate: formatedDate
            }
        })

    }


    let inputElement;

    if (name === "country") {
        inputElement = (
            <select value={value} className={styles.editItem} name={name} onChange={handleChange}>
                <option value="">Bitte wählen</option>
                <option value="Deutschland">Deutschland</option>
                <option value="Schweiz">Schweiz</option>
                <option value="Österreich">Österreich</option>
            </select>
        );
    } else if (name === "birthdate") {
        inputElement = (
            <DatePicker
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={35}
                className={styles.editItem}
                selected={dateFormatForDatePicker}
                name={name}
                onChange={(date) => handleDateChange(date)}

            />
        );
    } else if (name === "gender") {
        inputElement = (
            <select value={value} name={name} className={styles.editItem} onChange={handleChange}>
                <option value="male">männlich</option>
                <option value="female">weiblich</option>
                <option value="diverse">diverse</option>
            </select>
        );
    } else {
        inputElement = (
            <input
                type="text"
                name={name}
                value={value}
                onChange={handleChange}
                className={styles.editItem}
                placeholder={placeholderValue}
            />
        );
    }

    return inputElement;
}

export default EditItem