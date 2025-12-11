'use client'
import styles from '@/styles/Navigation.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {getValidInternalLink} from "@/lib/strapi/generalHelper";

const MobileNav = ({handleOpen, open, navigationData}: {
    handleOpen: () => void,
    open: boolean,
    navigationData: { label: string, href: string, id: string }[]
}) => {
    const pathname = usePathname();
    const navStyling = `${ styles.mobileNavWrapper } ${ open ? styles.open : styles.close }`

    const NavItems = navigationData?.map((item: { id: string, href: string, label: string }) => {

        return <li key={ item.id } onClick={ handleOpen }>
            <Link href={ getValidInternalLink(pathname, item.href) } className={ "linkStyle" }>
                { item.label.toUpperCase() }
            </Link>
        </li>
    })

    return <div className={ navStyling }>
        <div className={ styles.mobileNavInner }>
            <div className={ styles.closeButton }>
                <FontAwesomeIcon icon={ faClose } style={ {width: 30, height: 30} } onClick={ handleOpen }/>
            </div>
            <ul>
                { NavItems }

            </ul>
        </div>
    </div>

}

export default MobileNav;