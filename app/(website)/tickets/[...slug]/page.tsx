import TicketOrderPage from "@/pagesComponents/orders/TicketOrderPage";
import TicketDocumentsPage from "@/pagesComponents/orders/TicketDocumentsPage";
import {getSinglePaymentById} from "@/lib/strapi/paymentHelper";

export const dynamicParams = true

const TicketPage = async ({params, searchParams}:{params:Promise<{slug:string[]}>, searchParams:Promise<{pId: string, ticketId?:string, wId:string}>} ) => {

    const {slug}=await params;
    const search = await searchParams
    const {wId} = search
    console.log("search",search)
    console.log("slug",slug)

    if(slug.includes("documents")){
        const strapiPayment = await getSinglePaymentById(search.pId)
        const propsData = {...strapiPayment.data, wId}
        return <TicketDocumentsPage {...propsData}/>
    }
    return <TicketOrderPage/>
}

export default TicketPage;


