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