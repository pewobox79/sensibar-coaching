'use client'
import styles from '@/styles/Event.module.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {  faLocationDot, faCalendar, faClock, faTag } from '@fortawesome/free-solid-svg-icons'
import {calculateWorkshopPriceForPayPal, formatTimeToAdminFormat} from "@/lib/strapi/workshopHelper";
import {WorkshopTypes} from "@/types/generalTypes";
import {formatPrice} from "@/utils/helper/formater";

type EventInfoTypes ={
    workshop_date: string,
    workshopTimeStart: string,
    workshopTimeEnd: string,
    workshopType: string,
    location: WorkshopTypes['location']
    price: number
}
const EventInfoBox =({workshop_date, workshopTimeStart, workshopTimeEnd, workshopType, location, price}:EventInfoTypes )=>{
    const addressData = `${location?.street} ${location?.streetNumber}, ${location?.zipCode} ${location?.city} `
    console.log("price", price)
    return <div className={styles.singleEventDetailsBoxWrapper}>
        <div className={styles.detailsBoxItemHeader}><h3>Event Details</h3></div>
        <div className={styles.detailsBoxItem}><i><FontAwesomeIcon icon={faCalendar} style={{width:' 40px'}}/></i> {workshop_date} </div>
        <div className={styles.detailsBoxItem}><i><FontAwesomeIcon icon={faClock} style={{width:' 40px'}}/></i> {formatTimeToAdminFormat(workshopTimeStart as string)} bis {formatTimeToAdminFormat(workshopTimeEnd as string)} Uhr </div>
        <div className={styles.detailsBoxItem}><i><FontAwesomeIcon icon={faTag} style={{width:' 40px'}}/></i>{formatPrice(calculateWorkshopPriceForPayPal(Number(price)))} </div>
        {location &&     <div className={styles.detailsBoxItem}><i><FontAwesomeIcon icon={faLocationDot} style={{width:' 40px'}}/></i>{workshopType != "online" ? addressData: workshopType}</div>}
    </div>
}

export default EventInfoBox;