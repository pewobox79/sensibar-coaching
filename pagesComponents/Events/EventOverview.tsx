'use client'

import OverviewItem from "@/components/workshops/OverviewItem";
import Container from "@/components/global/Container";
import {getColor} from "@/utils/helper/colorHelper";
import styles from "@/styles/Event.module.css";
import {WorkshopTypes} from "@/types/generalTypes";


const EventOverview = (props: { data: [] }) => {
    const ListOfWorkshops = props && props?.data?.map((item: WorkshopTypes) => {

        return <OverviewItem { ...item } key={ item?.documentId } />
    })


    return <Container id="" backgroundColor={ "white" }>
        <div className={ styles.eventOverviewWrapper }><h1
            style={ {color: getColor("black").color, textAlign: "center"} }>Meine Workshops</h1>
            <br/>

            { ListOfWorkshops }</div>
    </Container>
}


export default EventOverview