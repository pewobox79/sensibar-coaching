'use client'

import OverviewItem from "@/components/workshops/OverviewItem";


const EventOverview = (props:{ data: []}) => {
    const ListOfWorkshops = props && props?.data?.map((item:{title: string, workshop_date: string, documentId: string, key:string, ws_status: string}) => {

        return <OverviewItem key={item?.documentId} title={ item.title } id={ item.documentId } workshop_date={ item.workshop_date } status={item.ws_status}/>
    })


    return <>
        <h1>Meine Workshops</h1>
        <br/>

        { ListOfWorkshops }

        <div style={{marginTop:"20px"}}><p style={ {fontSize: "1.4rem"} }>weitere Termine folgen...</p></div>


    </>
}


export default EventOverview