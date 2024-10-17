import styles from '@/styles/Navigation.module.css'
import Link from "next/link";
import {usePathname} from "next/navigation";

const DesktopNav=()=>{

    const pathname = usePathname();
    return <div className={styles.desktopNavWrapper}>
        <div className={styles.desktopNavInner}>

            <ul>
                <li><Link href="/" className={pathname === "/"? "activeLink":"linkStyle" } >Home</Link></li>
                <li><Link href="/workshops" className={pathname === "/workshops"? "activeLink":"linkStyle" }>Workshops</Link></li>

            </ul>
        </div>

    </div>
}

export default DesktopNav;