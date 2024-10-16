'use client'
import styles from '@/styles/Event.module.css'
import EventRegistration from "@/components/forms/EventRegistration";
import EventInfoBox from "@/components/forms/EventRegistration/EventInfoBox";
import RichTextRenderer from "@/components/strapi/RenderContentHelper";

const SingleEvent = (props:{data:[]}) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const workshopDetails:{title: string, description2: []} = props.data ? props?.data[0]:[]

    return <div className={ styles.singleEventWrapper }>
        <div className={ styles.singleEventInner }>
            <div className={ styles.singleEventHeader }>
                <h3>{ workshopDetails?.title }</h3>
            </div>

            <div className={ styles.singleEventMainContent }>
                <div className={ styles.singleEventContent50 }>
                    <div className={ styles.singleEventDescriptionParagraph }>
                        <RichTextRenderer blocks={workshopDetails.description2 ?workshopDetails.description2 :[] }/>
                    </div>
                </div>
                <div className={ styles.singleEventContent50 }>
                    <EventInfoBox/>
                    <EventRegistration/></div>
            </div>
            </div>

    </div>
}

export default SingleEvent;