import {ClientData} from "@/stores/useClientStore";

const STRAPI_URI = process.env.NEXT_PUBLIC_STRAPI_URL_DEV

const config={
    method: 'GET',
    headers: {
        Authorization: `Bearer ${ process.env.NEXT_PUBLIC_STRAPI_BEARER_TOKEN }`
    },
    next: { revalidate: 60 }
}
export const getNavigation = async () => {

    try {

        const response = await fetch(`${ STRAPI_URI }/api/navigation/?populate=*`, {next: { revalidate: 60 }})
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

export const getClientsArray = async (type:"patient" |"all") => {

    try {

        const response = await fetch(`${ STRAPI_URI }/api/contacts/?populate=*&sort=personalData.firstname:asc`,config )
        const clientsData = await response.json()
        let clientsArray = []
        if (clientsData) {

            const finalList = clientsData?.data?.filter((item: {isPatient: boolean}) => type === "all" ? !item.isPatient : item.isPatient);
            clientsArray = finalList.map((client: { personalData: { firstname: string, lastname: string } }) => {

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

        const response = await fetch(`${ STRAPI_URI }/api/contacts/?filters[personalData][firstname][$eq]=${ firstname.toLowerCase() }&[personalData][lastname][$eq]=${ lastname.toLowerCase() }&populate=*`, config)
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
export const transformContactToCoachee =async (token: string, id: string)=>{

    console.log("in transform to coachee", token, id)

    try {

        const response = await fetch(`${ STRAPI_URI }/api/contacts/${ id }?populate=*`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ token }`
            },
            body: JSON.stringify({data:{isPatient: true}})
        })

        if(!response.ok){
            return {msg: "update failed", status: response.statusText}
        }else{
            const updatedContact = await response.json()
            return {msg: "new coachee added", data: updatedContact.data}
        }


    } catch (err) {


        return {msg: "Kontakt update fehlerhaft.", err}

    }


}

export const updateContact = async (updatedData:ClientData, id:string|undefined, token:string) => {
console.log("token in update", token)
    //remove id items

    const newData = {
        personalData: {...updatedData.personalData},
        contact: [...updatedData.contact],
        address: {...updatedData.address},
        isPatient: updatedData.isPatient


    }

    try {

        const response = await fetch(`${ STRAPI_URI }/api/contacts/${ id }?populate=*`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ token }`
            },
            body: JSON.stringify({data:newData})
        })

        if(!response.ok){
            return {msg: "update failed", status: response.statusText}
        }else{
            const updatedContact = await response.json()
            return {msg: "Kontakt aktualisiert", data: updatedContact.data}
        }


    } catch (err) {


        return {msg: "Kontakt update fehlerhaft.", err}

    }


}

export const formatDateToStrapiFormat =(date:string)=>{

    const dateAsString = new Date(date).toISOString()

    const indexOf = dateAsString.indexOf("T")
    return dateAsString.slice(0, indexOf)




}

export const createNewCoachee = async (token:string, newData: unknown)=>{

    try {

        const response = await fetch(`${ STRAPI_URI }/api/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ token }`
            },
            body: JSON.stringify({data:newData})
        })

        if(!response.ok){
            return {msg: "create failed", status: response.statusText}
        }else{
            const updatedContact = await response.json()
            return {msg: "coachee created", data: updatedContact.data}
        }


    } catch (err) {


        return {msg: "Coachee create failed", err}

    }

}

