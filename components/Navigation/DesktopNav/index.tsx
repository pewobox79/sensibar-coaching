import styles from '@/styles/Navigation.module.css'
import Link from "next/link";
import {usePathname} from "next/navigation";

const DesktopNav = ({navigationData}: { navigationData: {label: string, href: string, id:string}[] }) => {

    const pathname = usePathname();
    const NavItems = navigationData?.filter((item:{label: string}) => item.label != "datenschutz" && item.label != "impressum" ).map((item: { id: string, href: string, label: string }) => {

        const getValidInternalLink =(sitepath:string, href:string)=>{
            const DOMAIN_URL = process.env.NEXT_PUBLIC_FRONTEND_URL ||''
            if(!href) return DOMAIN_URL

            if(sitepath != "/"){
                return `${DOMAIN_URL}${href}`
            }
            return href

        }

        return <li key={ item.id }>
            <Link href={ getValidInternalLink(pathname,item.href) } className={ pathname === item.href ? "activeLink" : "linkStyle" }>
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