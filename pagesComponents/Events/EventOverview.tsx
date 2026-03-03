'use client'

import OverviewItem from "@/components/workshops/OverviewItem";
import Container from "@/components/global/Container";
import {getColor} from "@/utils/helper/colorHelper";


const EventOverview = (props:{ data: []}) => {
    const ListOfWorkshops = props && props?.data?.map((item:{type: string, title: string, workshop_date: string, documentId: string, key:string, format: string}) => {

        return <OverviewItem key={item?.documentId} format={item.format} title={ item.title } id={ item.documentId } workshop_date={ item.workshop_date } />
    })


    return <Container id="" backgroundColor={"white"}>
        <h1 style={{color: getColor("black").color, textAlign: "center"}}>Meine Workshops</h1>
        <br/>

        { ListOfWorkshops }

        <div style={{marginTop:"20px"}}><p style={ {fontSize: "1.4rem"} }>weitere Termine folgen...</p></div>


    </Container>
}


export default EventOverview