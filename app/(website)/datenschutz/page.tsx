import {getBasicPageContent} from "@/lib/strapi/generalHelper";
import RenderContentHelper from "@/components/strapi/RenderContentHelper";

const Datenschutz =async ()=>{

    const data = await getBasicPageContent("Datenschutzerklärung")
    return <>
        <h1>{ data.data ? data?.data[0]?.title:"" }</h1>
        <RenderContentHelper blocks={ data.data ? data.data[0].mainContent: [] }/></>
}

export default Datenschutz;