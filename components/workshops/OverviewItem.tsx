
import styles from '@/styles/Event.module.css'
import Button from "@/components/global/Button";

const OverviewItem = ({title, workshop_date, id, status}: {
    title: string,
    workshop_date: string,
    id: string,
    status: string

}) => {

    return <div className={styles.workshopListItemWrapper }>
        <div className={styles.workshopListItemContent}>
            <h3>{ title }</h3>
            <p>Datum: { workshop_date }</p>
            <p>{status}</p>
        </div>
        <Button type={"button"} title={"details"} href={ `/workshops/${title.replace(/\s/g, "")}/${ id }` }/>

    </div>
}

export default OverviewItem