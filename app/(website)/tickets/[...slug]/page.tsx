import SingleEvent from "@/pagesComponents/Events/SingleEvent";
import {getAllWorkshops, getSingleWorkshop} from "@/lib/strapi/workshopHelper";
import {Metadata} from "next";
import {createWorkshopLink} from "@/utils/helper/formater";
import {slugify} from "@/utils/helper/slugify";
import TicketOrderPage from "@/pagesComponents/orders/TicketOrderPage";

export const dynamicParams = true
type Props = {
    params: Promise<{ slug: unknown[] }>
}

/*export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {slug} = await params
    // Fetch data based on slug (can be from CMS, DB, etc.)
    const data = await getSingleWorkshop(slug[1]);
    console.log("data metadata", data)
    const canonicalPath = createWorkshopLink(data?.data?.title, slug[1] as string)
    return {
        title: `SENSIBAR | ${ data?.data?.seoData?.metaTitle || data?.data?.title }`,
        description: data?.data?.seoData?.metaDescription,
        alternates: {
            canonical: canonicalPath
        },
        openGraph: {
            title: data?.data?.seoData ? data?.data?.seoData?.metaTitle : data?.data?.title,
            description: data?.data?.seoData?.metaDescription,
        },
    }
}*/

const TicketPage = async ({params}: Props) => {
    const {slug} = await params

    return <TicketOrderPage {...slug}/>
}

export default TicketPage;


