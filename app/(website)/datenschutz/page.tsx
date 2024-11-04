import {getBasicPageContent} from "@/lib/strapi/generalHelper";
import RenderContentHelper from "@/components/strapi/RenderContentHelper";

const Datenschutz =async ()=>{

    const data = await getBasicPageContent("Datenschutzerklärung")
    console.log("data basic page", data)
    return <>
        <h1>{ data?.data[0]?.title }</h1>
        <RenderContentHelper blocks={ data.data[0].mainContent }/></>
}

export default Datenschutz;