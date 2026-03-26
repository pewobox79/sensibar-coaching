'use client'
import WorkshopButtons from "@/lib/pdfCreator/templates/workshop/WorkshopButtons";
import {StrapiPaymentProps} from "@/types/generalTypes";

const TicketDocumentsPage = (props:StrapiPaymentProps) => {
    if(!props){
        return <div>Rechnung und Ticket sind nicht bekannt</div>
    }
    return <>
        <h1>Ticket Documents</h1>

        <WorkshopButtons {...props}/>
       </>
}

export default TicketDocumentsPage;