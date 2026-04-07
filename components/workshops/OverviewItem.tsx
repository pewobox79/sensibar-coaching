import styles from '@/styles/Event.module.css'
import Button from "@/components/global/Button";
import {isPastEvent} from "@/utils/helper/strapiHelper";
import {createWorkshopLink, formatIsoDateToGerman} from "@/utils/helper/formater";
import {WorkshopTypes} from "@/types/generalTypes";
import {faCalendar, faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const OverviewItem = ({title, workshop_date, documentId, format, location, type}: WorkshopTypes) => {

    const eventIsInThePast = isPastEvent(workshop_date)
    if (eventIsInThePast) return null
    return <div className={ styles.workshopListItemWrapper }>
        <div className={ styles.workshopListItemContent }>
            <div className={ styles.workshopListItemTitle }>
                <h4>{ title }</h4>
            </div>
            <div>
                <h4>{format}</h4>
                <p><FontAwesomeIcon icon={faCalendar} style={{width:' 40px'}}/>{ formatIsoDateToGerman(workshop_date) }</p>
                <p><FontAwesomeIcon icon={faLocationDot} style={{width:' 40px'}}/>{location?.city || type}</p>
            </div>
        </div>
        <Button type={ "button" } title={ "details" } href={ createWorkshopLink(title, documentId) } />

    </div>
}

export default OverviewItem