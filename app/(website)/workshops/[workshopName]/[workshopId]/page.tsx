import SingleEvent from "@/pagesComponents/Events/SingleEvent";
import {getSingleWorkshop} from "@/lib/strapi/workshopHelper";
import {Metadata} from "next";


type Props = {
    params: { workshopId: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const { workshopId } = params
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
    const singleWorkshopData = await getSingleWorkshop(params ?params?.workshopId:"")
    return <SingleEvent {...singleWorkshopData}/>
}

export default SingleEventPage;