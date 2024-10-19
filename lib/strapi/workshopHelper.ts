
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

export const checkIfContactExists = async (firstname:string, lastname:string, email:string, query:string="workshop-registrations")=>{

    try{
        const response = await fetch(`${ STRAPI_URI }/api/${query}?filters[contact][email][$eq]=${email}&filters[person][firstname][$eq]=${firstname}&filters[person][lastname][$eq]=${lastname}`)

        if(!response.ok){
             throw new Error(`HTTP error! status: ${response.status}`)
        }

        const json = await response.json()

        if(json.data.length === 0){
            return {msg: "new contact"}
        }else{
            return {msg:"contact already exists", json}
        }



    }catch(e){

        console.log("contact check failed", e);
    }
}
export const executeDoubleOptIn = async (id:string | null)=>{

    try{

        const response = await fetch(`${ STRAPI_URI }/api/workshop-registrations/${id}?populate=*`, {
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


        const data =  await response.json();
        console.log("after PUT to STRAPI response", data)

        if(data){
            const config ={
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: data.data.person.firstname,
                    id: data.data.documentId,
                    email: data.data.contact[0].email
                })
            }

            const response = await fetch(`/api/db/doi`, config)
           return await response.json();

        }


    }catch (e) {
        console.log("double opt in update failed", e)
    }
}