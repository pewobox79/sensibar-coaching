import TicketOrderPage from "@/pagesComponents/orders/TicketOrderPage";
import TicketDocumentsPage from "@/pagesComponents/orders/TicketDocumentsPage";

export const dynamicParams = true

const TicketPage = async ({params}:{params:Promise<{slug:string[]}>} ) => {

    const {slug}=await params;

    if(slug.includes("documents")){
        return <TicketDocumentsPage/>
    }
    return <TicketOrderPage/>
}

export default TicketPage;


