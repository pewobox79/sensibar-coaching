import {getPage} from "@/lib/strapi/generalHelper";
import StrapiItemsRendering from "@/layouts/StrapiItemsRendering";
import {StrapiData} from "@/types/generalTypes";
import {redirect} from "next/navigation";

const PageRenderComponent = async ({slug}: { slug: string }) => {
    console.log("slug", slug)
    const pageData = await getPage(slug)
    console.log("pageData", pageData)
    const selectedPage = pageData.data[0] as StrapiData

    console.log("selected Page", selectedPage)

    if(!selectedPage) return redirect("/")
    return (
        <div>
            { selectedPage?.items?.map(item => <StrapiItemsRendering key={ item.id } { ...item }/>) }
        </div>
    );
};

export default PageRenderComponent;