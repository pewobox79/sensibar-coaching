import WorkshopsPage from "@/pagesComponents/AdminPage/WorkshopsPage";
import {getAllWorkshops} from "@/lib/strapi/workshopHelper";
import {Suspense} from "react";

const WorkshopPage =async ()=>{

    const workshops = await getAllWorkshops();
    console.log("workshops", workshops)


    return <Suspense fallback={"loading..."}><WorkshopsPage workshops={workshops ? workshops.data : []}/></Suspense>
}

export default WorkshopPage