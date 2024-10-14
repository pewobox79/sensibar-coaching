'use client'
import styles from '@/styles/Event.module.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {  faLocationDot, faCalendar, faClock } from '@fortawesome/free-solid-svg-icons'

const EventInfoBox =()=>{

    return <div className={styles.singleEventDetailsBoxWrapper}>
        <div className={styles.detailsBoxItemHeader}><h3>Event Details</h3></div>
        <div className={styles.detailsBoxItem}><i><FontAwesomeIcon icon={faCalendar}/></i> Datum: </div>
        <div className={styles.detailsBoxItem}><i><FontAwesomeIcon icon={faClock} /></i> Uhrzeit: </div>
        <div className={styles.detailsBoxItem}><i><FontAwesomeIcon icon={faLocationDot} /></i> Ort: </div>
    </div>
}

export default EventInfoBox;