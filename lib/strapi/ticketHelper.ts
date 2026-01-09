const STRAPI_URI = process.env.NEXT_PUBLIC_STRAPI_URL_DEV

const randomIdExtension =()=>{

    const FACTOR = 1000000
    return Math.floor(Math.random() * FACTOR)
}

export const generateUniqueWorkshopTicketId =(workshopID:string, workshopStartDate: string)=>{

    if(!workshopStartDate ||!workshopID) return false;

    const cleanedWSId = workshopID.replaceAll(' ', '').toLowerCase()
    const cleanedWSDate = workshopStartDate.replaceAll('-','').toLowerCase()
    return `${cleanedWSId}-${cleanedWSDate}-${randomIdExtension()}`


}


export const createNewTicket =async (workshopDate:string, workshopId:string)=>{

    const uidValue = generateUniqueWorkshopTicketId(workshopId, workshopDate)

    const newTicketData ={data: {
            workshop: workshopId,
            ticketId: uidValue
        }}
    try {

        const response = await fetch(`${ STRAPI_URI }/api/event-tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ process.env.NEXT_PUBLIC_STRAPI_BEARER_TOKEN }`
            },
            body: JSON.stringify(newTicketData)
        })

        const ticketData = await response.json()
        return {ticketId: ticketData.data?.documentId}


    } catch (err) {

        console.log("konnte nicht übergeben werden", err)
        return {msg: "ticket konnte nicht erstellt werden."}

    }


}