
const STRAPI_URI = process.env.NEXT_PUBLIC_STRAPI_URL_DEV

export const userLoginRequest = async (identifier: string, password:string)=>{
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({identifier, password})
    }
    try{

        const response = await fetch(`${STRAPI_URI}/api/auth/local`, config)
        const data = await response.json()

        if(!response.ok){
            return {msg: "user login failed", response: response}
        }

        return data
    }catch (e){

        return{msg: "something went wrong on login", e}
    }


}