import EventOverview from "@/pagesComponents/Events/EventOverview";
import {getAllWorkshops} from "@/lib/strapi/workshopHelper";
import {Metadata} from "next";
import {SENSIBAR_URL} from "@/utils/variables";




export async function generateMetadata(): Promise<Metadata> {

    return {
        title:  `SENSIBAR | Workshops für Hochsensiblität`,
        description: 'Hochsensiblität ist bei vielen nicht bekannt. In unseren Workshops lernen Sie sich selbst besser kennen. Wir geben Ihnen Tools mit, um mit Hochsensibilität besser zu leben',
        alternates: {
            canonical: `${SENSIBAR_URL}workshops`
        },openGraph: {
            title: "SENSIBAR | Workshops für Hochsensiblität",
            description: 'Hochsensiblität ist bei vielen nicht bekannt. In unseren Workshops lernen Sie sich selbst besser kennen. Wir geben Ihnen Tools mit, um mit Hochsensibilität besser zu leben',
        },
    }
}

const EventsPage =async()=>{
    const allWorkshops = await getAllWorkshops()
    return <EventOverview {...allWorkshops}/>

}

export default EventsPage;