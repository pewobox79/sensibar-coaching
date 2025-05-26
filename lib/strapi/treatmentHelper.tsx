
const STRAPI_URI = process.env.NEXT_PUBLIC_STRAPI_URL_DEV

export type TreatmentDataType = {
    data: { title: string, details: string, location: "vor Ort" | "online" | "telefonisch", contact: string }
}


export const createNewTreatmentItem = async (data: TreatmentDataType, token:string) => {
    try {

        const response = await fetch(`${ STRAPI_URI }/api/treatment-notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ token }`
            },
            body: JSON.stringify(data)
        })

        const newTreatmentData = await response.json()

        if(!response.ok){
            return {msg: "failed", status: response.statusText}
        }else{
            return {msg: "neuer Eintrag hinzugefügt", data: newTreatmentData.data}
        }


    } catch (err) {

        console.log("konnte nicht übergeben werden", err)
        return {msg: "Eintrag erstellen fehlerhaft."}

    }

}


export const getTreatmentItemsByContact = async (contactId:string, token:string)=>{


    const config ={
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ token }`
        },
        next:{
            revalidate: 60,
        }
    }
    try {

        const response = await fetch(`${ STRAPI_URI }/api/contacts/${contactId}?populate=treatment_notes`, config)

        const treatmentList = await response.json()

        return {msg: "Treatmentlist success", data: treatmentList.data?.treatment_notes}


    } catch (err) {

        console.log("konnte nicht übergeben werden", err)
        return {msg: "Eintrag update fehlerhaft."}

    }

}


export const updateTreatmentById =async (id:string, data:{data:{details: string, title: string, type: string} }, token:string)=>{

    try {

        const response = await fetch(`${ STRAPI_URI }/api/treatment-notes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ token }`
            },
            body: JSON.stringify(data)
        })


        const newTreatmentData = await response.json()
        if(!response.ok){
            return {msg: "failed", status: response.statusText}
        }else{
            return {msg: "eintrag aktualisiert", data: newTreatmentData.data}
        }


    } catch (err) {

        console.log("konnte nicht übergeben werden", err)
        return {msg: "failed"}

    }



}