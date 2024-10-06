import styles from '@/styles/Footer.module.css'
import Link from "next/link";

const Footer=()=>{

    return <footer>

        <div className={styles.footerInner}>

            <div><Link href={"/impressum"}>Impressum</Link></div>
            <div><Link href={"/datenschutz"}>Datenschutzerklärung</Link></div>
        </div>
    </footer>
}

export default Footer;