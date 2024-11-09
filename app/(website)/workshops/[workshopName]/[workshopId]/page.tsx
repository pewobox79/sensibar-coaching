import SingleEvent from "@/pages/Events/SingleEvent";
import {getSingleWorkshop} from "@/lib/strapi/workshopHelper";

const SingleEventPage = async ({params}:{params: {workshopId: string}})=>{
    const singleWorkshopData = await getSingleWorkshop(params ?params?.workshopId:"")
    console.log("single page",singleWorkshopData)
    return <SingleEvent {...singleWorkshopData}/>
}

export default SingleEventPage;