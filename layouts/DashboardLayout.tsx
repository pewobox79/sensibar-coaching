'use client'
import styles from '@/styles/DashboardLayout.module.css'
import React from "react";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faProjectDiagram, faUser, faLineChart, faSearch} from "@fortawesome/free-solid-svg-icons";
import {usePathname} from 'next/navigation'

const DashboardLayout = ({children}: { children: React.ReactNode | React.ReactElement | React.ReactElement[] }) => {

    const path = usePathname();

    const isWorkshopPath = path && path.includes("workshops");
    const isAdminPath = path && path === "/admin";
    const isClientPath = path && path.includes("client");

    return <div className={ styles.dashboardWrapper }>
        <div className={ styles.dashboardSidebar }>
            <Link href={ "/admin" }
                  className={ `${ styles.sidebarItem } ${ isAdminPath && styles.activeIconButtonStyle }` }>
                <FontAwesomeIcon icon={ faLineChart }
                                 className={ `${ styles.iconStyle } ${ isAdminPath && styles.activeIconStyle }` }/>
            </Link>
            <Link href={ "/admin/client" }
                  className={ `${ styles.sidebarItem } ${ isClientPath && styles.activeIconButtonStyle }` }>
                <FontAwesomeIcon icon={ faUser }
                                 className={ `${ styles.iconStyle } ${ isClientPath && styles.activeIconStyle }` }/>
            </Link>
            <Link href={ "/admin/workshops" }
                  className={ `${ styles.sidebarItem } ${ isWorkshopPath && styles.activeIconButtonStyle }` }>
                <FontAwesomeIcon icon={ faProjectDiagram }
                                 className={ `${ styles.iconStyle } ${ isWorkshopPath && styles.activeIconStyle }` }/>
            </Link>
            <div className={ styles.sidebarItem }>
                <FontAwesomeIcon icon={ faPlusCircle } className={ styles.iconStyle }/>
            </div>
            <div className={ styles.sidebarItem }>
                <FontAwesomeIcon icon={ faSearch } className={ styles.iconStyle }/>
            </div>

        </div>
        <div>
            { children }
        </div>

    </div>
}

export default DashboardLayout;