'use client'
import styles from '@/styles/WorkshopsOverview.module.css'
import Button from "@/components/global/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faPen, faSave} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import WorkshopContactOverview
    from "@/components/dashboardComponents/WorkshopsOverview/components/WorkshopContactOverview";
import {deleteWorkshopById, generateMailingList, updateWorkshopStatus} from "@/lib/strapi/workshopHelper";
import ToastMessage from "@/components/global/ToastMessage";
import WorkshopCancelWindow from "@/components/dashboardComponents/WorkshopsOverview/components/WorkshopCancelWindow";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import WsEditItem from "@/components/dashboardComponents/WorkshopsOverview/components/WsEditItem";

const WorkshopCard = (props: {
    key: string,
    documentId: string,
    title: string,
    workshop_date: string,
    link: { href: string, target: string, label: string },
    type: string,
    ws_status: string,
    contacts: [],
}) => {


    const INIT_WS_VALUES ={
        documentId: props.documentId,
        title: props.title,
        workshop_date: props.workshop_date,
        link: { href: props.link?.href },
        type: props.type,
        ws_status: props.ws_status,
    }
    const token = useLocalStorage("sensiUser")?.value

    const [contactDetails, setContactDetails] = useState(false)
    const [edit, setEdit] = useState({state: false, values: INIT_WS_VALUES});
    const [onClipboard, setOnClipboard] = useState(false);
    const [success, setSuccess] = useState({state: false, type: "success", msg: "Absage Emails versendet"});
    const [error, setError] = useState({state: false, type: "error", msg: "absage konnte nicht verschickt werden"});
    const [openCancel, setOpenCancel] = useState(false)


    function handleCopyLink() {
        navigator.clipboard.writeText(`${ props?.link?.href }`).then(() => {
            setOnClipboard(true)
        });

        setTimeout(() => {
            setOnClipboard(false)
        }, 2000);
    }

    function handleUpdateWorkshop() {

        setEdit({...edit, state: !edit.state})
    }

    function handleEditFeature() {
        setEdit({...edit, state: !edit.state})
    }

    function handleContactDetails() {
        setContactDetails(!contactDetails)
    }

    function cancelMessageWindow() {

        setOpenCancel(!openCancel)
    }

    async function handleWorkshopCancel() {

        try {
            const response = await generateMailingList(props.contacts)


            const config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    emails: response,
                    workshopName: props.title,
                    workshopDate: props.workshop_date,

                })
            }

            if (response) {

                const cancelResponse = await fetch("/api/workshop", config)
                const data = await cancelResponse.json();


                if (data.msg === "email successfully sent") {

                    const wsUpdateResponse = await updateWorkshopStatus(props.documentId, "cancelled", token.jwt)

                    if (wsUpdateResponse.msg === "workshop updated") {

                        setSuccess({...success, state: true})
                        cancelMessageWindow()

                    } else {
                        setError({...error, state: true, msg: "update workshop in database failed"})
                        cancelMessageWindow()
                    }


                }
            } else {
                setError({...error, state: true,})
                cancelMessageWindow()
            }
        } catch (e) {
            console.error('Error generating mailing list:', e)
        }


    }

    async function handleWSDelete (){

        try{

            const response = await deleteWorkshopById(props.documentId, token.jwt)
            console.log("delete response: ", response)

            if(response.msg === "workshop deleted"){
                setSuccess({...success, state: true, msg: "Workshop gelöscht"})
                setTimeout(() =>{

                    window.location.reload()
                }, 2000)
            }

        }catch(e){

            console.log("delete error", e)
        }
    }

    async function handleConfirmWorkshop(){

        try{

            const response = await updateWorkshopStatus(props.documentId, "confirmed",token.jwt);
            if (response.msg === "workshop updated") {

                setSuccess({...success, state: true, msg: "Workshop zu Bestätigt geändert"})
            }

        }catch(e){
            console.log("delete error", e)
        }
    }

    return <>
        { error.state && <ToastMessage state={ error } setState={ setError }/> }
        { success.state && <ToastMessage state={ success } setState={ setSuccess }/> }
        { openCancel &&
          <WorkshopCancelWindow title={ props.title } date={ props.workshop_date } action={ handleWorkshopCancel }
                                close={ cancelMessageWindow }/> }

        <div className={ styles.cardWrapper }>
            <div className={ styles.cardInner }>
                { edit.state ? <div className={ styles.editButton } onClick={ handleUpdateWorkshop }>
                        <FontAwesomeIcon icon={ faSave }/></div> :
                    <div className={ styles.editButton } onClick={ handleEditFeature }>
                        <FontAwesomeIcon icon={ faPen }/></div> }

                <div className={ styles.cardBody } style={{marginTop: `${edit.state ? "20px": null}`}}>
                    {edit.state ? <WsEditItem type={"text"} value={edit.values.title} /> :<h4 style={ {textAlign: "center"} }>{ props?.title }</h4>}
                    <div className={ styles.cardBodySection }>
                        <h4>Details:</h4>
                        {edit.state ? <WsEditItem type={"date"} value={edit.values.workshop_date}/> :<p>Datum: { props.workshop_date }</p>}
                        {edit.state ? <WsEditItem type={"select"} value={edit.values.ws_status} property={"ws_status"}/>:<p>Status: { props?.ws_status }</p>}
                    </div>

                    <div className={ styles.cardBodySection }>
                        {edit.state ? <WsEditItem type={"select"} value={edit.values.link.href} property={"location"}/> :<p>Location: { props?.type }</p>}
                        {edit.state ? <WsEditItem type={"text"} value={edit.values.link.href} /> :<p><a href={ `${ props?.link?.href }` } title={ `${ props.link?.label }` }
                              target={ `${ props.link?.target }` }>Weblink</a>
                        </p>}
                        <p>{!edit.state && <><FontAwesomeIcon icon={ faCopy } onClick={ () => handleCopyLink() }/> { onClipboard &&
                          <span style={ {color: "green"} }>Link copied</span> }</>}</p>

                    </div>


                    <div className={ `${ styles.cardBodySection } ${ styles.participantArea }` }
                         onClick={ handleContactDetails }>
                        <h4>Teilnehmer:</h4>
                        <p> { props.contacts?.length }</p>
                    </div>
                    {/*<div className={ styles.cardBodySection }>
                        <h4>Rückmeldungen:</h4>
                        <p>Sensitive: 10</p>
                        <p>Weiß nicht: 25</p>
                        <p>Nein: 19</p>
                    </div>*/}
                </div>

                <div className={ styles.cardButtons }>
                    {props.ws_status === "confirmed" && <Button type={ "submit" } title={"absagen"} action={ cancelMessageWindow }/>}
                    {props.ws_status === "cancelled" && <Button type={ "submit" } title={ "löschen"} action={ handleWSDelete }/>}
                    {props.ws_status != "cancelled" && <Button type={ "submit" } title={ "einladen" }/>}
                    {props.ws_status === "planned" && <Button type={ "submit" } title={ "bestätigen" }action={handleConfirmWorkshop}/>}
                </div>
            </div>

            { contactDetails &&
              <WorkshopContactOverview contacts={ props.contacts } action={ handleContactDetails }/>
            }


        </div>
    </>


}

export default WorkshopCard