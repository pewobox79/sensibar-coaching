'use client'
import styles from '@/styles/Event.module.css'
import EventRegistration from "@/components/forms/EventRegistration";
import EventInfoBox from "@/components/forms/EventRegistration/EventInfoBox";
import RichTextRenderer from "@/components/strapi/RenderContentHelper";

const SingleEvent = (props:{data:[]}) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const workshopDetails:{title: string, description: [], workshop_date:string, workshopTimeStart: string, workshopTimeEnd: string, type:string} = props.data ? props?.data[0]:[]

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
                    <EventRegistration/></div>
            </div>
            </div>

    </div>
}

export default SingleEvent;