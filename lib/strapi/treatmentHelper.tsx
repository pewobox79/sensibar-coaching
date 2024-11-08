const STRAPI_URI = process.env.NEXT_PUBLIC_STRAPI_URL_DEV


export type TreatmentDataType = {
    data: { title: string, details: string, location: "vor Ort" | "online" | "telefonisch", contact: string }
}
export const createNewTreatmentItem = async (data: TreatmentDataType) => {

    try {

        const response = await fetch(`${ STRAPI_URI }/api/treatment-notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const newTreatmentData = await response.json()

        return {msg: "neuer Eintrag hinzugefügt", data: newTreatmentData.data}


    } catch (err) {

        console.log("konnte nicht übergeben werden", err)
        return {msg: "Eintrag update fehlerhaft."}

    }

}


export const getTreatmentItemsByContact = async (contactId:string)=>{

    try {

        const response = await fetch(`${ STRAPI_URI }/api/contacts/${contactId}?populate=treatment_notes`)

        const treatmentList = await response.json()

        return {msg: "Treatmentlist success", data: treatmentList.data?.treatment_notes}


    } catch (err) {

        console.log("konnte nicht übergeben werden", err)
        return {msg: "Eintrag update fehlerhaft."}

    }

}
