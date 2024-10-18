const STRAPI_URI=process.env.NEXT_PUBLIC_STRAPI_URL_DEV

export const getNavigation = async ()=>{

    try{

        const response = await fetch(`${STRAPI_URI}/api/navigation/?populate=*`)
        return await response.json()

    }catch(e){

        console.error('Error fetching navigation data:', e)
    }
}