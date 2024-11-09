'use client'
import styles from '@/styles/Event.module.css'
import EventRegistration from "@/components/forms/EventRegistration";
import EventInfoBox from "@/components/forms/EventRegistration/EventInfoBox";
import RichTextRenderer from "@/components/strapi/RenderContentHelper";

const SingleEvent = (props:{data:{title:string, description:[],workshop_date:string, workshopTimeStart:string, documentId:string, id:string }}) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const workshopDetails:{title: string, description: [], workshop_date:string, workshopTimeStart: string, workshopTimeEnd: string, type:string, documentId:string} = props.data ? props?.data:{}

    return <div className={ styles.singleEventWrapper }>
        <div className={ styles.singleEventInner }>
            <div className={ styles.singleEventHeader }>
                <h3>{ workshopDetails?.title }</h3>
            </div>

            <div className={ styles.singleEventMainContent }>
                <div className={ styles.singleEventContent50 }>
                    <div className={ styles.singleEventDescriptionParagraph }>
                        <RichTextRenderer blocks={workshopDetails.description ?workshopDetails.description :[] }/>
                    </div>
                </div>
                <div className={ styles.singleEventContent50 }>
                    <EventInfoBox workshop_date={workshopDetails.workshop_date} workshopTimeStart={workshopDetails.workshopTimeStart} workshopTimeEnd={workshopDetails.workshopTimeEnd} workshopType={workshopDetails.type}/>
                    <EventRegistration workshopId={workshopDetails.documentId} workshopName={workshopDetails.title}/></div>
            </div>
            </div>

    </div>
}

export default SingleEvent;