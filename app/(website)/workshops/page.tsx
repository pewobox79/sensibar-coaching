import EventOverview from "@/pages/Events/EventOverview";
import {getAllWorkshops} from "@/lib/strapi/workshopHelper";

const EventsPage =async()=>{

    const allWorkshops = await getAllWorkshops()

    return <EventOverview {...allWorkshops}/>



}

export default EventsPage;