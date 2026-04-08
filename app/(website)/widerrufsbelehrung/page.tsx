import {getBasicPageContent} from "@/lib/strapi/generalHelper";
import RenderContentHelper from "@/components/strapi/RenderContentHelper";
import {Suspense} from "react";
import type {Metadata} from "next";
import {SENSIBAR_URL} from "@/utils/variables";

export const metadata: Metadata = {
    title: "SENSIBAR | sensibel & wunderbar",
    description: "Hochsensible Menschen bekommen bei mir hilfreiche tipps und methoden für eine bessere Lebensqualität",
    icons:[{
        url: "/favicon.png"
    }],
    alternates:{
        canonical: `${SENSIBAR_URL}impressum`
    },
    openGraph:{
        type: "website",
        url: "https://sensibar-coaching.de",
        title: "SENSIBAR | sensibel & wunderbar",
        description: "Hochsensible Menschen bekommen bei mir hilfreiche tipps und methoden für eine bessere Lebensqualität",
        images: [
            {
                url: "/favicon.png",
                width: 1200,
                height: 630,
                alt: "SENSIBAR | sensibel & wunderbar",
            },
        ],
        siteName: "SENSIBAR | sensibel & wunderbar",
        locale: "de_DE",
    }
};
const Widerrufsbelehrung = async () => {

    const data = await getBasicPageContent("widerrufsbelehrung")
    console.log("data widerruf", data)

    return <div className={ "innerWrapper" }>

        <Suspense fallback={ "loading" }><h1>{ data?.data ? data?.data[0]?.title : "" }</h1><RenderContentHelper
            blocks={ data?.data ? data?.data[0]?.mainContent : [] }/></Suspense></div>
}

export default Widerrufsbelehrung;