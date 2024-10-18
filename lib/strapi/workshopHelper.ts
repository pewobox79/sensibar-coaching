const STRAPI_URI = process.env.NEXT_PUBLIC_STRAPI_URL_DEV

export const getAllWorkshops = async () => {

    try {

        const response = await fetch(`${ STRAPI_URI }/api/workshops`)

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch (e) {

        console.log("workshop fetch failed", e);
    }

}

export const getSingleWorkshop = async (id:string|unknown) =>{

    try {

        const response = await fetch(`${ STRAPI_URI }/api/workshops/${id}`)

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch (e) {

        console.log("workshop fetch failed", e);
    }
}


export const executeDoubleOptIn = async (id:string | null)=>{

    try{

        const response = await fetch(`${ STRAPI_URI }/api/workshop-registrations/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               data:{
                   gdpr:true
               }
            })
        })

        console.log("update contact", id )
        return response.json()


    }catch (e) {
        console.log("double opt in update failed", e)
    }
}
/*
export const createWorkshopRegistration= async (data:unknown)=>{

const dataMapping ={
    data:{
        person: {
            firstname: data.firstname,
            lastname: data.lastname
        },
        workshop: [data.workshop],
        contact:[{
            email: data.email,
            phone: data.phone
        }],
        gdpr: data.gdpr,
        sensitiveType: data.condition,
        participate: data.participate
    }
}
    const config ={
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataMapping)
    }
    try {
        fetch(`${STRAPI_URI}/api/workshop-registrations/`, config)

    }catch(e) {
        console.log("workshop registration failed", e);
    }
}

*/
