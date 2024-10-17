'use client'
import styles from '@/styles/Event.module.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {  faLocationDot, faCalendar, faClock } from '@fortawesome/free-solid-svg-icons'

type EventInfoTypes ={
    workshop_date: string,
    workshopTimeStart: string,
    workshopTimeEnd: string,
    workshopType: string
}
const EventInfoBox =({workshop_date, workshopTimeStart, workshopTimeEnd, workshopType}:EventInfoTypes )=>{
    return <div className={styles.singleEventDetailsBoxWrapper}>
        <div className={styles.detailsBoxItemHeader}><h3>Event Details</h3></div>
        <div className={styles.detailsBoxItem}><i><FontAwesomeIcon icon={faCalendar}/></i> Datum: {workshop_date} </div>
        <div className={styles.detailsBoxItem}><i><FontAwesomeIcon icon={faClock} /></i> Uhrzeit: {workshopTimeStart} bis {workshopTimeEnd} </div>
        <div className={styles.detailsBoxItem}><i><FontAwesomeIcon icon={faLocationDot} /></i> Ort:  {workshopType}</div>
    </div>
}

export default EventInfoBox;