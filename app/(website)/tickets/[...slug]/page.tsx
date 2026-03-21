import TicketOrderPage from "@/pagesComponents/orders/TicketOrderPage";
import TicketDocumentsPage from "@/pagesComponents/orders/TicketDocumentsPage";
import {getSinglePaymentById} from "@/lib/strapi/paymentHelper";

export const dynamicParams = true

const TicketPage = async ({params, searchParams}:{params:Promise<{slug:string[]}>, searchParams:Promise<{pId: string, ticketId:string}>} ) => {

    const {slug}=await params;
    const search = await searchParams

    const strapiPayment = await getSinglePaymentById(search.pId)

    if(slug.includes("documents")){
        return <TicketDocumentsPage {...strapiPayment.data}/>
    }
    return <TicketOrderPage/>
}

export default TicketPage;


