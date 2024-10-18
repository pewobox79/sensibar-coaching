'use client'
import styles from '@/styles/Navigation.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faClose} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const MobileNav = ({handleOpen, open}:{handleOpen: ()=>void, open: boolean}) => {



const navStyling = `${styles.mobileNavWrapper} ${open ? styles.open : styles.close}`


    return <div className={ navStyling }>
        <div className={styles.mobileNavInner}>
            <div className={styles.closeButton}>
                <FontAwesomeIcon icon={faClose} style={{width: 30, height: 30}} onClick={handleOpen }/>
            </div>
            <ul>
                <li><Link href="/" onClick={handleOpen} className={"linkStyle"}>Home</Link></li>
                <li><Link href="/workshops" onClick={handleOpen} className={"linkStyle"}>Workshops</Link></li>
                <li><Link href="/impressum" onClick={handleOpen} className={"linkStyle"}>Impressum</Link></li>

            </ul>
        </div>
    </div>

}

export default MobileNav;