const STRAPI_URI=process.env.NEXT_PUBLIC_STRAPI_URL_DEV

export const getNavigation = async ()=>{

    try{

        const response = await fetch(`${STRAPI_URI}/api/navigation/?populate=*`)
        console.log("response", response)
        return await response.json()

    }catch(e){

        console.error('Error fetching navigation data:', e)
    }
}

export const getBasicPageContent= async (title:string)=>{

    try{

        const response = await fetch(`${STRAPI_URI}/api/basic-pages/?filters[title][$eq]=${title}`)
        return await response.json()
    }catch(e){

        console.error('Error fetching basic page content:', e)
    }
}