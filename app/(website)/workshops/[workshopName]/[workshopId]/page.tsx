import SingleEvent from "@/pagesComponents/Events/SingleEvent";
import {getAllWorkshops, getSingleWorkshop} from "@/lib/strapi/workshopHelper";
import {Metadata} from "next";
import {slugify} from "@/utils/helper/slugify";

export const dynamicParams = true
type Props = {
    params: { workshopId: string }
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const { workshopId } = await params
    // Fetch data based on slug (can be from CMS, DB, etc.)
    const data = await getSingleWorkshop(workshopId);
    return {
        title:  `SENSIBAR | ${data?.data?.seoData?.metaTitle || data?.data?.title}`,
        description: data?.data?.seoData?.metaDescription,
        openGraph: {
            title: data?.data?.seoData ? data?.data?.seoData?.metaTitle : data?.data?.title,
            description: data?.data?.seoData?.metaDescription,
        },
    }
}

const SingleEventPage = async ({params}:{params: {workshopId: string}})=>{
    const {workshopId} = await params
    const singleWorkshopData = await getSingleWorkshop(params ?workshopId:"")
    return <SingleEvent {...singleWorkshopData}/>
}

export default SingleEventPage;


export const dynamic = 'force-static'

export async function generateStaticParams() {
    const workshops = await getAllWorkshops();
    if (!workshops?.data) return [];

    return workshops.data.map((ws: {title: string, documentId: string}) => ({
        workshopName: slugify(ws.title),
        workshopId: ws.documentId
    }));
}