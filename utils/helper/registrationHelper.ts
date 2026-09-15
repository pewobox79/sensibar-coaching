import {LocationType} from "@/types/generalTypes";

export const notifyContactAfterRegistration = async (registerType: "newContact" |"existingContact", id:string, email:string, workshopName:string, workshopId:string, location?: LocationType, workshopType?: string): Promise<void> => {


    const dataToSubmit ={
        newContact: {
            id,
            email,
            workshopName,
            workshopId,
            location,
            workshopType,
        },
        existingContact: {
            id,
            email,
            workshopName,
            workshopId,
        }
    }
        await fetch('/api/db/participant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               ...dataToSubmit[registerType]
            }),
        })

}

export const subscribeAdventCalender = async (data: {email: string, sid: string})=>{

    try{
        const response = await fetch('/api/db/adventsubscription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...data}),
        })
        const json = await response.json()
        console.log("subscribe email response", json)
        return json
    }catch(err){
        console.log(err)

    }
}