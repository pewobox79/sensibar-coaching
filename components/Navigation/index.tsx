'use client'
import DesktopNav from "@/components/Navigation/DesktopNav";
import MobileNav from "@/components/Navigation/MobileNav";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import styles from '@/styles/Navigation.module.css'
import {getNavigation} from "@/lib/strapi/generalHelper";

const Navigation = () => {
    const [open, setOpen] = useState(false);
    const [navigation, setNavigation] = useState([])


    useEffect(() => {
        async function fetchNavigation() {

            try {
                const response = await getNavigation()
                console.log("navdata", response)
                setNavigation(response.data.navLink)
            } catch (e) {
                console.error('Error fetching navigation data:', e)
            }

        }

        fetchNavigation()

    }, [])

    function handleOpen() {
        setOpen(!open)
    }


    return <nav>
        <div className={ styles.burgerButton }>
            { !open && <FontAwesomeIcon icon={ faBars } onClick={ handleOpen } style={ {width: 40, height: 40} }/> }
        </div>
        <DesktopNav navigationData={ navigation }/>
        <MobileNav handleOpen={ handleOpen } open={ open } navigationData={ navigation }/>
    </nav>
}

export default Navigation;