import {getPage} from "@/lib/strapi/generalHelper";
import StrapiItemsRendering from "@/layouts/StrapiItemsRendering";
import {StrapiData} from "@/types/generalTypes";
import {redirect} from "next/navigation";

const AppointmentPage = async ({slug}: { slug: string }) => {
    const pageData = await getPage(slug)
    const selectedPage = pageData.data[0] as StrapiData

    if(!selectedPage) return redirect("/")
    return (
        <div>
            { selectedPage?.items?.map(item => <StrapiItemsRendering key={ item.id } { ...item }/>) }
        </div>
    );
};

export default AppointmentPage;