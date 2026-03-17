export const sendMailingAfterRegistration = async (contactId:string, contactEmail:string, workshopName:string, workshopId:string)=>{


    const dataToSend ={
        id: contactId,
        email: contactEmail,
        workshopName: workshopName,
        workshopId: workshopId,
    }
    try{
        const response = await fetch('/api/db/participant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
       return await response.json()
    }catch(error){

        console.log(error)
    }

}