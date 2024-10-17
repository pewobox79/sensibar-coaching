'use client'
import DesktopNav from "@/components/Navigation/DesktopNav";
import MobileNav from "@/components/Navigation/MobileNav";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import styles from '@/styles/Navigation.module.css'

const Navigation =()=>{

    const [open, setOpen] = useState(false)
    function handleOpen(){
        setOpen(!open)
    }

    return <nav>
        <div className={styles.burgerButton}>
        {!open && <FontAwesomeIcon icon={faBars} onClick={handleOpen} style={{width: 40, height: 40}}/>}
        </div>
        <DesktopNav/>
      <MobileNav handleOpen={handleOpen}  open={open} />
    </nav>
}

export default Navigation;