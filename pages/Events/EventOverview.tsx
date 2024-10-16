'use client'

import OverviewItem from "@/components/workshops/OverviewItem";


const EventOverview = (props:{ data: []}) => {

    const ListOfWorkshops = props && props?.data?.map((item:{title: string, workshop_date: string, id: string}) => {

        return <OverviewItem  title={ item.title } id={ item.id } workshop_date={ item.workshop_date } key={item.id}/>
    })


    return <>
        <h1>Meine Workshops</h1>
        <div style={{marginTop: "30px", width: "100%"}}>
        { ListOfWorkshops }
        </div>

    </>
}


export default EventOverview