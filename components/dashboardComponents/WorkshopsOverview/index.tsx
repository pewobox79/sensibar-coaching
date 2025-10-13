import WorkshopCard from "@/components/dashboardComponents/WorkshopsOverview/components/WorkshopCard";
import styles from '@/styles/WorkshopsOverview.module.css'

const WorkshopsOverview = ({workshops=[]}) => {

    const ListOfWorkshops =workshops.map((workshop:{ location: {city: string, street: string, streetNumber: string, zipCode: string, country: string}, documentId: string,title: string, workshop_date:string, workshopTimeStart: string, workshopTimeEnd:string, description: [] , link:{href: string, target: string, label: string}, type: string, ws_status: string, contacts:[]}) =>{

        return <WorkshopCard key={workshop.documentId} {...workshop } />
    })
    return <div className={ styles.cardsOverviewWrapper }>
        {ListOfWorkshops}
    </div>
}

export default WorkshopsOverview