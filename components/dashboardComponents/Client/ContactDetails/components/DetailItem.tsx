'use client'
import styles from '@/styles/Client.module.css'
type DetailItemTypes = {
    title: string,
    category: "telefon" | "email" | "strasse" | "nummer" | "stadt" | "land" | "vorname" | "nachname" | "geburtstag" | "plz" |"geschlecht"
}
const DetailItem = ({title, category}: DetailItemTypes) => {

    const hrefExtension = category === "telefon" ? "tel:" : "mailTo:"

    return <div>
        { category === "telefon" || category === "email" ?
            <p className={styles.detailItemElement}>{ category }: <a href={ `${ hrefExtension }${ title?.trim() }` }>{ title?.toUpperCase() }</a></p> :
            <p className={styles.detailItemElement}>{ category }: { title?.toUpperCase() } </p> }
    </div>
}

export default DetailItem