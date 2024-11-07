const STRAPI_URI = process.env.NEXT_PUBLIC_STRAPI_URL_DEV

export const getNavigation = async () => {

    try {

        const response = await fetch(`${ STRAPI_URI }/api/navigation/?populate=*`)
        console.log("response", response)
        return await response.json()

    } catch (e) {

        console.error('Error fetching navigation data:', e)
    }
}

export const getBasicPageContent = async (slug: string) => {

    try {

        const response = await fetch(`${ STRAPI_URI }/api/basic-pages/?filters[slug][$eq]=${ slug }`)
        return await response.json()
    } catch (e) {

        console.error('Error fetching basic page content:', e)
    }
}

export const getClientsArray = async () => {

    try {

        const response = await fetch(`${ STRAPI_URI }/api/contacts/?populate=*`)
        const clientsData = await response.json()
        let clientsArray = []
        if (clientsData) {

            clientsArray = clientsData.data.map((client: { personalData: { firstname: string, lastname: string } }) => {

                return `${ client.personalData.firstname.toUpperCase() } ${ client.personalData.lastname.toUpperCase() }`

            })
            return clientsArray

        }
    } catch (e) {

        console.error('Error fetching basic page content:', e)
    }

}


export const getSelectedClientFromAPI = async (firstname: string, lastname: string) => {


    try {

        const response = await fetch(`${ STRAPI_URI }/api/contacts/?filters[personalData][firstname][$eq]=${ firstname.toLowerCase() }&[personalData][firstname][$eq]=${ lastname.toLowerCase() }&populate=*`)
        const clientData = await response.json()
        return clientData.data[0]

    } catch (e) {

        console.error('Error fetching basic page content:', e)
    }


}


export const convertStringToFirstAndLastName = (data: string) => {

    const [firstName, lastName] = data?.split(' ');

    return {firstName, lastName};

}

export const updateContact = async (updatedData:unknown, id:string) => {

    //remove id items
    delete updatedData.personalData.id
    delete updatedData.contact[0].id

    if(updatedData.address != null){
        delete updatedData.address.id
    }



    const newData = {
        personalData: {...updatedData.personalData},
        contact: [...updatedData.contact],
        address: {...updatedData.address}


    }

    console.log("newData", newData)
    try {

        const response = await fetch(`${ STRAPI_URI }/api/contacts/${ id }?populate=*`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data:newData})
        })

        const updatedContact = await response.json()

        return {msg: "Kontakt aktualisiert", data: updatedContact.data}


    } catch (err) {

        console.log("konnte nicht aktualisiert werden", err)
        return {msg: "Kontakt update fehlerhaft."}

    }


}