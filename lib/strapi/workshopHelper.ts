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
    console.log("workshop fetch", id)

    try {

        const response = await fetch(`${ STRAPI_URI }/api/workshops/?id=${id}`)

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch (e) {

        console.log("workshop fetch failed", e);
    }
}

