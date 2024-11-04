import {getBasicPageContent} from "@/lib/strapi/generalHelper";
import RenderContentHelper from "@/components/strapi/RenderContentHelper";
import {Suspense} from "react";

const Datenschutz =async ()=>{

    const data = await getBasicPageContent("Datenschutzerklärung")
    return <>
        <h1>{ data.data ? data?.data[0]?.title:"title" }</h1>
        <Suspense fallback={"loading"}><RenderContentHelper blocks={ data.data ? data.data[0].mainContent: [] }/></Suspense></>
}

export default Datenschutz;