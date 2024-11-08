'use client'
import styles from '@/styles/EmailInfo.module.css'
import {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";

const EmailInfo = ({setEmailInfo}:{setEmailInfo:(data:boolean)=>void}) => {


    useEffect(()=>{
       setTimeout(()=>{
           setEmailInfo(false)
       }, 5000)

    }, [setEmailInfo])

    function handleClose(){
        setEmailInfo(false)
    }
    return <div className={ styles.emailInfoWrapper }>

        <div className={ styles.emailInfoInner }>

            <h4>Bitte prüfe deine Email Inbox</h4>
            <p >Ich habe dir eine E-Mail geschickt.</p>
            <p> Es kann sein, dass die in dem SPAM-Ordner liegt. Schau einfach kurz
                nach um Deine Anmeldung abzuschließen.</p>
            <div onClick={ handleClose }><FontAwesomeIcon icon={ faClose } className={ styles.closeButton }/></div>
        </div>
    </div>
}

export default EmailInfo;