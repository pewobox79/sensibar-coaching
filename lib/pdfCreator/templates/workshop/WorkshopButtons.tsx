'use client'

import {PDFDownloadLink} from "@react-pdf/renderer";
import WorkshopTicketPdf from "@/lib/pdfCreator/templates/workshop/ticket/WorkshopTicketPdf";
import TicketInvoicePdf from "@/lib/pdfCreator/templates/workshop/invoice/TicketInvoicePdf";
import {capitalizeFirstLetter, formatIsoDateToGerman} from "@/utils/helper/formater";
import {formatTimeToAdminFormat} from "@/lib/strapi/workshopHelper";
import {StrapiPaymentProps} from "@/types/generalTypes";

const WorkshopButtons = (props:StrapiPaymentProps) => {
    const {event_ticket, transaction, billingAddress, contact, invoiceNumber, billing} = props

    return <div style={ {display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap"} }>
        { billing && <PDFDownloadLink className={ "globalButton" } document={ <TicketInvoicePdf
            seller={ {
                name: "Sensibar Coaching",
                street: "Musterstraße 1",
                zip: "20354",
                city: "Hamburg",
                country: "Deutschland",
            } }
            buyer={ {
                name: `${ capitalizeFirstLetter(contact?.personalData?.firstname) } ${ capitalizeFirstLetter(contact?.personalData?.lastname) }`,
                street: `${ billingAddress?.street } ${ billingAddress?.streetNumber }`,
                zip: billingAddress?.zipCode || '',
                city: billingAddress?.city || '',
                country: billingAddress?.country || '',
            } }
            invoiceNumber={ `TSB-2026-${ invoiceNumber }` }
            invoiceDate="17.03.2026"
            serviceDate="12.04.2026"
            workshopName={ event_ticket?.workshop?.title || '' }
            workshopDate={ formatIsoDateToGerman(event_ticket?.workshop?.workshop_date) || "" }
            workshopTime={ `${ formatTimeToAdminFormat(event_ticket?.workshop?.workshopTimeStart) || '' } - ${ formatTimeToAdminFormat(event_ticket?.workshop?.workshopTimeEnd) || '' }` }
            workshopLocation={ event_ticket?.workshop?.location?.city || '' }
            bookedBy={ `${ capitalizeFirstLetter(contact?.personalData?.firstname) } ${ capitalizeFirstLetter(contact?.personalData?.lastname) }` }
            ticketNumber={ event_ticket?.ticketId }
            quantity={ 1 }
            unitPriceNet={ 84.03 }
            vatRate={ 19 }
            taxNumber="12/345/67890"
            paymentMethod={ transaction?.provider || '' }
            paymentStatus={ transaction?.transactionState === "COMPLETED" ? "bezahlt" : "offen" }
        /> }
                                      fileName="ticket-rechnung.pdf">
            { ({loading}) =>
                loading ? 'Dokument lädt...' : 'Download Rechnung'
            }
        </PDFDownloadLink> }

        <PDFDownloadLink className={ "globalButton" } document={ <WorkshopTicketPdf
            format={ event_ticket?.workshop?.format || '' }
            workshopName={ event_ticket?.workshop?.title || '' }
            date={ formatIsoDateToGerman(event_ticket?.workshop?.workshop_date) || "" }
            time={ `${ formatTimeToAdminFormat(event_ticket?.workshop?.workshopTimeStart) || '' } - ${ formatTimeToAdminFormat(event_ticket?.workshop?.workshopTimeEnd) || '' }` }
            location={ event_ticket?.workshop?.location?.city || '' }
            bookedBy={ `${ capitalizeFirstLetter(contact?.personalData?.firstname) } ${ capitalizeFirstLetter(contact?.personalData?.lastname) }` }
            ticketNumber={ event_ticket?.ticketId?.split('-')[2] }
        /> }
                         fileName="ticket.pdf">
            { ({loading}) =>
                loading ? 'Ticket lädt...' : 'Download Ticket'
            }
        </PDFDownloadLink>
    </div>
}

export default WorkshopButtons;