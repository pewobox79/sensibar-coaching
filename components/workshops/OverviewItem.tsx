import styles from '@/styles/Event.module.css'
import Button from "@/components/global/Button";
import {isPastEvent} from "@/utils/helper/strapiHelper";
import {createWorkshopLink, formatIsoDateToGerman} from "@/utils/helper/formater";

const OverviewItem = ({title, workshop_date, id, format}: {
    title: string,
    workshop_date: string,
    id: string,
    format: string

}) => {

    const eventIsInThePast = isPastEvent(workshop_date)
    if (eventIsInThePast) return null
    return <div className={ styles.workshopListItemWrapper }>
        <div className={ styles.workshopListItemContent }>
            <div className={ styles.workshopListItemTitle }>
                <h3>{ title }</h3>
            </div>
            <div>
                <h4>{format}</h4>
                <p>{ formatIsoDateToGerman(workshop_date) }</p>

            </div>
        </div>
        <Button type={ "button" } title={ "details" } href={ createWorkshopLink(title, id) } />

    </div>
}

export default OverviewItem