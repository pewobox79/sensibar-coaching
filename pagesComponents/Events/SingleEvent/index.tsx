'use client'
import styles from '@/styles/Event.module.css'
import EventRegistration from "@/components/forms/EventRegistration";
import EventInfoBox from "@/components/forms/EventRegistration/EventInfoBox";
import RichTextRenderer from "@/components/strapi/RenderContentHelper";
import Container from "@/components/global/Container";
import {WorkshopTypes} from "@/types/generalTypes";


const SingleEvent = (props:{data:WorkshopTypes}) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const workshopDetails:EventDetailsProps = props.data ? props?.data:{}

    return <Container id={"single workshop"}>

        <div className={ styles.singleEventWrapper }>
            <div className={ styles.singleEventInner }>
                <div className={ styles.singleEventHeader }>
                    <h1>{ workshopDetails?.title }</h1>
                </div>

                <div className={ styles.singleEventMainContent }>
                    <div className={ styles.singleEventContent50 }>
                        <div className={ styles.singleEventDescriptionParagraph }>
                            <RichTextRenderer blocks={workshopDetails.description ?workshopDetails.description :[] }/>
                        </div>
                    </div>
                    <div className={ styles.singleEventContent50 }>
                        <EventInfoBox price={workshopDetails?.workshopPrice} location={workshopDetails?.location} workshop_date={workshopDetails?.workshop_date} workshopTimeStart={workshopDetails?.workshopTimeStart} workshopTimeEnd={workshopDetails?.workshopTimeEnd} workshopType={workshopDetails?.type}/>
                        {workshopDetails.ws_status === "confirmed" &&<EventRegistration {...workshopDetails}/>}</div>
                </div>
            </div>

        </div>
    </Container>
}

export default SingleEvent;