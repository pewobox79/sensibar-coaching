import Scanner from "@/components/dashboardComponents/TicketScanner/Scanner";

const TicketScanner =async ({searchParams}:{searchParams: Promise<{workshopId: string, ticketId: string}>})=>{

    const {workshopId, ticketId} = await searchParams

    console.log("workshopId", workshopId, "ticketId",ticketId)
    return <Scanner/>
}


export default TicketScanner