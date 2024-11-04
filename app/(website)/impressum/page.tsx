import {getBasicPageContent} from "@/lib/strapi/generalHelper";
import RenderContentHelper from "@/components/strapi/RenderContentHelper";

const Impressum = async()=>{

    const data = await getBasicPageContent("Impressum")

    return <>

        <h1>{ data?.data[0]?.title }</h1>
        <RenderContentHelper blocks={data?.data[0]?.mainContent}/></>
}

export default Impressum;