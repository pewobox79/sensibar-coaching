
const STRAPI_URI = process.env.NEXT_PUBLIC_STRAPI_URL_DEV

export const getAllWorkshops = async () => {

    try {

        const response = await fetch(`${ STRAPI_URI }/api/workshops?populate=*`, {next: { revalidate: 60 }})

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${ response.status }`)
        }
        return await response.json()
    } catch (e) {

        console.log("workshop fetch failed", e);
    }

}

export const getSingleWorkshop = async (id: string | unknown) => {

    try {

        const response = await fetch(`${ STRAPI_URI }/api/workshops/${ id }?populate=*`, {next: { revalidate: 60 }})

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${ response.status }`)
        }
        return await response.json()
    } catch (e) {

        console.log("workshop fetch failed", e);
    }
}

export const checkIfContactExists = async (firstname: string, lastname: string, email: string, query: string = "contacts") => {

    try {
        const response = await fetch(`${ STRAPI_URI }/api/${ query }?filters[contact][email][$eq]=${ email }&filters[personalData][firstname][$eq]=${ firstname }&filters[personalData][lastname][$eq]=${ lastname }&populate=contact`)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${ response.status }`)
        }

        const json = await response.json()

        if (json.data.length === 0 || undefined) {
            return {msg: "new contact"}
        } else {
            return {msg: "contact already exists", data: json.data}
        }


    } catch (e) {

        console.log("contact check failed", e);
    }
}



export const addContactToWorkshop = async (contactId: string, workshopId:string, updatedArray?:unknown[]) => {

    const newData ={
        data:{
            contacts: updatedArray
        }
    }
    try {

        const response = await fetch(`${ STRAPI_URI }/api/workshops/${ workshopId }?populate=*`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        })

        const updatedWorkshop = await response.json()

        return {msg: "Kontakt zu Workshop hinzugefügt", data: updatedWorkshop.data}


    } catch (err) {

        console.log("konnte nicht übergeben werden", err)
        return {msg: "workshop contact update fehlerhaft."}

    }

}


export const executeDoubleOptIn = async (id: string | null, workshopLink:string, title: string, workshop_date: string) => {

    try {

        const response = await fetch(`${ STRAPI_URI }/api/contacts/${ id }?populate=*`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    gdpr: true
                }
            })
        })


        const data = await response.json();

        if (data) {
            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: data.data.personalData.firstname,
                    id: data.data.documentId,
                    workshopLink: workshopLink,
                    workshopDate: workshop_date,
                    workshopTitle: title,
                    email: data.data.contact[0].email
                })
            }

            const response = await fetch(`/api/db/doi`, config)
            return await response.json();

        }


    } catch (e) {
        console.log("double opt in update failed", e)
    }
}