import {getBasicPageContent} from "@/lib/strapi/generalHelper";
import RenderContentHelper from "@/components/strapi/RenderContentHelper";
import {Suspense} from "react";

const Impressum = async () => {

    const data = await getBasicPageContent("impressum")

    return <div className={ "innerWrapper" }>


        <Suspense fallback={ "loading" }><h1>{ data.data ? data?.data[0]?.title : "" }</h1><RenderContentHelper
            blocks={ data.data ? data.data[0].mainContent : [] }/></Suspense></div>
}

export default Impressum;