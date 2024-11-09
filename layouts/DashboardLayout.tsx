'use client'
import styles from '@/styles/DashboardLayout.module.css'
import React from "react";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faProjectDiagram, faUser, faLineChart, faSearch} from "@fortawesome/free-solid-svg-icons";
import {usePathname, useRouter} from 'next/navigation'
import ClientSearch from "@/components/dashboardComponents/Client/ClientSearch";
import {useModalOpen} from "@/stores/useModalOpen";
import GlobalModal from "@/components/global/GlobalModal";
import WorkshopForm from "@/components/forms/WorkshopForm";
import Button from "@/components/global/Button";

const DashboardLayout = ({children}: { children: React.ReactNode | React.ReactElement | React.ReactElement[] }) => {

    const path = usePathname();
    const router = useRouter();

    const isWorkshopPath = path && path.includes("workshops");
    const isAdminPath = path && path === "/admin";
    const isClientPath = path && path.includes("client");

    const searchStatus = useModalOpen().status
    console.log("searchstatus",searchStatus)
    const openSearch = useModalOpen().setSearchOpen;
    const openCreateModal = useModalOpen().setCreateModalOpen
    const closeCreateModal = useModalOpen().setCreateModalClose

    function handleCreateNewWorkshop(){

        router.push("/admin/workshops/create")
        closeCreateModal()

    }

    function handleSearchOpen() {
        openSearch();
    }

    function handleCreateModal() {
        openCreateModal()
    }

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
            <div className={ styles.sidebarItem } onClick={ handleCreateModal }>
                <FontAwesomeIcon icon={ faPlusCircle } className={ styles.iconStyle }/>
            </div>
            <div className={ styles.sidebarItem } onClick={ handleSearchOpen }>
                <FontAwesomeIcon icon={ faSearch } className={ styles.iconStyle }/>
            </div>

        </div>

            { children }

        { searchStatus.search && <ClientSearch/> }
        { searchStatus.createModal && <GlobalModal><h1>Was möchtest du kreieren?</h1><Button type={"submit"} action={handleCreateNewWorkshop} title={"neuer workshop"}/><Button title={"neuer Coachee"} type={"submit"}/></GlobalModal> }
    </div>
}

export default DashboardLayout;