'use client'

import styles from '@/styles/Footer.module.css'
import Link from "next/link";
import {useEffect, useState} from "react";
import {getNavigation} from "@/lib/strapi/generalHelper";
import {getActualYear} from "@/utils/helper/formater";

const Footer = () => {

    const [footerNav, setFooterNav] = useState([])

    useEffect(() => {
        async function fetchNavigation() {

            try {
                const response = await getNavigation()
                setFooterNav(response.data.navLink)
            } catch (e) {
                console.error('Error fetching navigation data:', e)
            }

        }

        fetchNavigation()

    }, [])

    const footerNavItems = footerNav.filter((item: {
        label: string
    }) => item.label == "impressum" || item.label == "datenschutz").map((item: {
        id: string,
        label: string,
        href: string
    }) => {

        return <div key={ item.id } className={ styles.footerLink }><Link href={ item.href }
                                                                          className={ "linkStyle" }>{ item.label.toUpperCase() }</Link>
        </div>
    })
    return <footer>

        <div className={ styles.footerInner }>
            <div className={ styles.footerNavWrapper }>
                { footerNavItems }
            </div>


        </div>

        <div className={ styles.legalFooterNote }><p>&copy; { getActualYear() } Yessica Wolf. All Rights Reserved.</p></div>

    </footer>
}

export default Footer;