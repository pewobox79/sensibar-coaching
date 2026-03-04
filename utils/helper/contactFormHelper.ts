import {ContactFormTypes} from "@/types/generalTypes";

const FRONTEND_URI = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'

const LOCAL_FORM_URL = `${ FRONTEND_URI }/api/contactform`
export const handleFormSubmission = async (formData: ContactFormTypes) => {

    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }

    try {
        const response = await fetch(LOCAL_FORM_URL, config)

        return await response.json()

    } catch (err) {
        return {msg: "Es ist ein Fehler aufgetreten. Bitte versuche es später noch einmal.", err}
    }
}