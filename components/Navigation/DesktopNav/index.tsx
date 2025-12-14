import styles from '@/styles/Navigation.module.css'
import Link from "next/link";
import { usePathname} from "next/navigation";
import {getValidInternalLink} from "@/lib/strapi/generalHelper";


const DesktopNav = ({navigationData}: { navigationData: { label: string, href: string, id: string }[] }) => {
    const pathname = usePathname();

    const NavItems = navigationData?.filter((item: {
        label: string
    }) => item.label != "datenschutz" && item.label != "impressum").map((item: {
        id: string,
        href: string,
        label: string
    }) => {
        return <li key={ item.id } >
            <Link href={ getValidInternalLink(pathname, item.href) }
                  className={ pathname === item.href ? "activeLink" : "linkStyle" }>
                { item.label.toUpperCase() }
            </Link>
        </li>
    })


    return <div className={ styles.desktopNavWrapper }>
        <div className={ styles.desktopNavInner }>
            <ul>
                { NavItems }
            </ul>
        </div>

    </div>
}

export default DesktopNav;