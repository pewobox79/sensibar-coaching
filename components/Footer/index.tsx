import styles from '@/styles/Footer.module.css'
import Link from "next/link";

const Footer=()=>{

    return <footer>

        <div className={styles.footerInner}>
            <div className={styles.footerLink}><Link href={"/impressum"} className={"linkStyle"}>Impressum</Link></div>
            <div className={styles.footerLink}><Link href={"/datenschutz"} className={"linkStyle"}>Datenschutzerklärung</Link></div>
        </div>
    </footer>
}

export default Footer;