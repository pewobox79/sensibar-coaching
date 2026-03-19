'use client'

import {PDFDownloadLink} from "@react-pdf/renderer";
import WorkshopTicketPdf from "@/lib/pdfCreator/templates/workshop/ticket/WorkshopTicketPdf";
import TicketInvoicePdf from "@/lib/pdfCreator/templates/workshop/invoice/TicketInvoicePdf";

const WorkshopButtons = () => {

    return <div style={ {display: "flex", justifyContent: "center", alignItems: "center",     flexWrap: "wrap" } }>
        <PDFDownloadLink className={ "globalButton" } document={ <TicketInvoicePdf
            seller={{
                name: "Sensibar Coaching",
                street: "Musterstraße 1",
                zip: "20354",
                city: "Hamburg",
                country: "Deutschland",
            }}
            buyer={{
                name: "Max Mustermann",
                street: "Beispielweg 12",
                zip: "20095",
                city: "Hamburg",
                country: "Deutschland",
            }}
            invoiceNumber="RE-2026-000145"
            invoiceDate="17.03.2026"
            serviceDate="12.04.2026"
            workshopName="Achtsamkeits-Workshop"
            workshopDate="12.04.2026"
            workshopTime="14:00 – 17:00 Uhr"
            workshopLocation="Hamburg, Raum Elbe"
            bookedBy="Max Mustermann"
            ticketNumber="WS-2026-00428"
            quantity={1}
            unitPriceNet={84.03}
            vatRate={19}
            taxNumber="12/345/67890"
            paymentMethod="PayPal"
            paymentStatus="Bezahlt"
        /> }
                         fileName="ticket-rechnung.pdf">
            { ({loading}) =>
                loading ? 'Dokument lädt...' : 'Download Rechnung'
            }
        </PDFDownloadLink>

        <PDFDownloadLink className={ "globalButton" } document={ <WorkshopTicketPdf
            workshopName="Achtsamkeits-Workshop"
            date="12.04.2026"
            time="14:00 – 17:00 Uhr"
            location="Hamburg, Raum Elbe"
            bookedBy="Max Mustermann"
            ticketNumber="WS-2026-00428"
        /> }
                         fileName="ticket.pdf">
            { ({loading}) =>
                loading ? 'Dokument lädt...' : 'Download Ticket'
            }
        </PDFDownloadLink>
    </div>
}

export default WorkshopButtons;