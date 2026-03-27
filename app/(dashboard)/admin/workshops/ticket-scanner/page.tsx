import Scanner from "@/components/dashboardComponents/TicketScanner/Scanner";

const TicketScanner =async ({searchParams}:{searchParams: Promise<{workshopId: string, ticketId: string}>})=>{

    const {workshopId, ticketId} = await searchParams
    return <Scanner/>
}


export default TicketScanner