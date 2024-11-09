'use client'
import React from 'react'
import styles from '@/styles/Consent.module.css'
import {useEffect, useState} from "react";
import Button from "@/components/global/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFeather} from "@fortawesome/free-solid-svg-icons";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import ConsentForm from "@/components/forms/ConsentForm";

const Consent = () => {

    const localStorage=useLocalStorage("sensibarConsent")
    const [open, setOpen] = useState(true);
    const [consentValue, setConsentValue] = useState(localStorage?.value ? localStorage?.value : {necessary: true, marketing: false, tracking: false})

    useEffect(() => {
        if(localStorage?.value != null){

            setOpen(false)
        }
    }, [])

    function handleConsent() {
        setOpen(!open)
    }

    function saveConsent(){
        localStorage?.setStoredValue(consentValue)
        setOpen(!open)
    }

    function handleChange(e?:{target: {name: string, checked: boolean}}){
        if(e){
            setConsentValue({...consentValue, [e.target.name]:e.target.checked})

        }

    }

    return <>

        { open ? <div className={ styles.ConsentWrapper }>

            <div className={ styles.consentInner }>
                <h4>Consent Management</h4>
                <p>Sensibar-coaching.de versucht so weit wie möglich, auf Cookies zu verzichten.</p>
                <p>Wähle aus der Liste aus, was für Dich dennoch akzeptable ist.</p>
                <div>

                <ConsentForm action={handleChange} values={consentValue}/>

                </div>
                <div className={ styles.buttonsSection }>
                    <Button type={ "submit" } title={ "akzeptieren" } action={ saveConsent }/>
                    <Button type={ "submit" } title={ "schließen" } action={ handleConsent }/>
                </div>
            </div>

        </div> : <div className={styles.fingerPrint}><FontAwesomeIcon icon={ faFeather } style={{width: 30, height:30}} onClick={handleConsent}/></div> }</>
}

export default Consent;