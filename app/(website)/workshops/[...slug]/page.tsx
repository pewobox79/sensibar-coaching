import SingleEvent from "@/pagesComponents/Events/SingleEvent";
import {getAllWorkshops, getSingleWorkshop} from "@/lib/strapi/workshopHelper";
import {Metadata} from "next";
import {createWorkshopLink} from "@/utils/helper/formater";
import {slugify} from "@/utils/helper/slugify";

export const dynamicParams = true
type Props = {
    params: Promise<{ slug: unknown[] }>
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
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
}

export const dynamic = 'force-static'

export async function generateStaticParams() {
    const workshops = await getAllWorkshops();
    if (!workshops?.data) return [];

    return workshops.data.map((ws: { title: string, documentId: string }) => (
        {slug: [slugify(ws.title), ws.documentId]}
    ));
}

const SingleEventPage = async ({params}: { params: Promise<{ slug: unknown[] }> }) => {
    const {slug} = await params
    const singleWorkshopData = await getSingleWorkshop(slug[1] as string)

    if (!singleWorkshopData) return <h1>no page</h1>
    return <SingleEvent { ...singleWorkshopData }/>
}

export default SingleEventPage;


