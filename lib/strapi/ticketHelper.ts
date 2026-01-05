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