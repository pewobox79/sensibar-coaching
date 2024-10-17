import Link from "next/link";
import styles from '@/styles/Event.module.css'

const OverviewItem = ({title, workshop_date, id}: {
    title: string,
    workshop_date: string,
    id: string,

}) => {

    return <div className={styles.workshopListItemWrapper }>
        <div className={styles.workshopListItemContent}>
            <h3>{ title }</h3>
            <p>Datum: { workshop_date }</p>
        </div>
        <Link href={ `/workshops/${ id }` }>Details</Link>

    </div>
}

export default OverviewItem