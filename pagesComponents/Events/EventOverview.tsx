'use client'

import OverviewItem from "@/components/workshops/OverviewItem";
import Container from "@/components/global/Container";
import {getColor} from "@/utils/helper/colorHelper";
import styles from "@/styles/Event.module.css";


const EventOverview = (props:{ data: []}) => {
    const ListOfWorkshops = props && props?.data?.map((item:{type: string, title: string, workshop_date: string, documentId: string, key:string, format: string}) => {

        return <OverviewItem key={item?.documentId} format={item.format} title={ item.title } id={ item.documentId } workshop_date={ item.workshop_date } />
    })


    return <Container id="" backgroundColor={"white"}>
        <div className={styles.eventOverviewWrapper}><h1 style={{color: getColor("black").color, textAlign: "center"}}>Meine Workshops</h1>
            <br/>

            { ListOfWorkshops }</div>
    </Container>
}


export default EventOverview