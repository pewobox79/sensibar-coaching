'use client'
import styles from '@/styles/WorkshopsOverview.module.css'
import Button from "@/components/global/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faPen, faSave} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import WorkshopContactOverview
    from "@/components/dashboardComponents/WorkshopsOverview/components/WorkshopContactOverview";
import {
    deleteWorkshopById, formatTimeToAdminFormat, formatTimeToStrapiFormat,
    generateMailingList,
    updateWorkshop,
    updateWorkshopStatus
} from "@/lib/strapi/workshopHelper";
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
    description: [],
    workshopTimeStart: string,
    workshopTimeEnd: string,
}) => {


    const INIT_WS_VALUES = {
        documentId: props.documentId,
        title: props.title,
        workshop_date: props.workshop_date,
        link: {href: props.link?.href, target: props.link?.target,},
        type: props.type,
        ws_status: props.ws_status,
        workshopTimeStart: props.workshopTimeStart,
        workshopTimeEnd: props.workshopTimeEnd,
    }
    const token = useLocalStorage("sensiUser")?.value

    const [contactDetails, setContactDetails] = useState(false)
    const [edit, setEdit] = useState({state: false, values: INIT_WS_VALUES});
    const [onClipboard, setOnClipboard] = useState(false);
    const [success, setSuccess] = useState({state: false, type: "success", msg: "Absage Emails versendet"});
    const [error, setError] = useState({state: false, type: "error", msg: "absage konnte nicht verschickt werden"});
    const [openCancel, setOpenCancel] = useState(false);

    console.log("description", edit.values)

    function handleCopyLink() {
        navigator.clipboard.writeText(`${ edit.values?.link?.href }`).then(() => {
            setOnClipboard(true)
        });

        setTimeout(() => {
            setOnClipboard(false)
        }, 2000);
    }

    async function handleUpdateWorkshop() {
        console.log("save updates", edit.values)

        const updatedData = {
            title: edit.values.title,
            workshop_date: edit.values.workshop_date,
            link: {href: edit.values.link?.href},
            type: edit.values.type,
            ws_status: edit.values.ws_status,
            workshopTimeStart: formatTimeToStrapiFormat(edit.values.workshopTimeStart),
            workshopTimeEnd: formatTimeToStrapiFormat(edit.values.workshopTimeEnd)

        }
        try {

            const response = await updateWorkshop(props.documentId, updatedData, token.jwt);
            if (response.msg === "workshop updated") {
                setSuccess({...success, state: true, msg: "Workshop wurde aktualisiert"})
                setEdit({...edit, state: !edit.state})
            } else {
                setError({...error, state: true, msg: "Workshop konnte nicht aktualisiert werden"})
            }

        } catch (e) {
            console.error("Error updating workshop:", e)
            setError({...error, state: true, msg: "ein Fehler ist aufgetreten"})
        }


        setEdit({...edit, state: !edit.state})
    }

    function handleChange(event: { target: { value: string, name: string } }) {
        console.log("event", event)
        if (event.target.name === "href") {
            console.log("update href")
            setEdit({
                ...edit,
                values: {...edit.values, link: {...edit.values.link, [event.target.name]: event.target.value}}
            })
        } else {
            setEdit({...edit, values: {...edit.values, [event.target.name]: event.target.value}})
        }
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

    async function handleWSDelete() {

        try {

            const response = await deleteWorkshopById(props.documentId, token.jwt)
            console.log("delete response: ", response)

            if (response.msg === "workshop deleted") {
                setSuccess({...success, state: true, msg: "Workshop gelöscht"})
                setTimeout(() => {

                    window.location.reload()
                }, 2000)
            }

        } catch (e) {

            console.log("delete error", e)
        }
    }

    async function handleConfirmWorkshop() {

        try {

            const response = await updateWorkshopStatus(props.documentId, "confirmed", token.jwt);
            if (response.msg === "workshop updated") {

                setSuccess({...success, state: true, msg: "Workshop zu Bestätigt geändert"})
            }

        } catch (e) {
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

                <div className={ styles.cardBody } style={ {marginTop: `${ edit.state ? "20px" : null }`} }>
                    { edit.state ? <WsEditItem type={ "text" } value={ edit.values.title } property={ "title" }
                                               changeAction={ handleChange }/> :
                        <h4 style={ {textAlign: "center"} }>{ edit.values.title }</h4> }
                    <div className={ styles.cardBodySection }>
                        <h4>Details:</h4>
                        { edit.state ?
                            <WsEditItem type={ "date" } value={ edit.values.workshop_date } property={ "workshop_date" }
                                        changeAction={ handleChange }/> :
                            <p>Datum: { edit.values.workshop_date }</p> }

                        { edit.state ?
                            <WsEditItem type={ "time" } value={ edit.values.workshopTimeStart }
                                        property={ "workshopTimeStart" }
                                        changeAction={ handleChange }/> :
                            <p>Beginn: { formatTimeToAdminFormat(edit.values.workshopTimeStart) }</p> }

                        { edit.state ?
                            <WsEditItem type={ "time" } value={ edit.values.workshopTimeEnd }
                                        property={ "workshopTimeEnd" }
                                        changeAction={ handleChange }/> :
                            <p>Datum: { formatTimeToAdminFormat(edit.values.workshopTimeEnd) }</p> }


                        { edit.state ?
                            <WsEditItem type={ "select" } value={ edit.values.ws_status } property={ "ws_status" }
                                        changeAction={ handleChange }/> :
                            <p>Status: { edit.values?.ws_status }</p> }
                    </div>

                    <div className={ styles.cardBodySection }>

                    </div>

                    <div className={ styles.cardBodySection }>
                        { edit.state ? <WsEditItem type={ "select" } value={ edit.values.type as string }
                                                   property={ "type" } changeAction={ handleChange }/> :
                            <p>Location: { edit.values?.type }</p> }
                        { edit.state ?
                            <WsEditItem type={ "text" } value={ edit.values.link.href as string } property={ "href" }
                                        changeAction={ handleChange }/> :
                            <p><a href={ `${ edit.values?.link?.href }` } title={ `${ props.link?.label }` }
                                  target={ `${ edit.values.link?.target }` }>Weblink</a>
                            </p> }
                        <p>{ !edit.state && <><FontAwesomeIcon icon={ faCopy }
                                                               onClick={ () => handleCopyLink() }/> { onClipboard &&
                          <span style={ {color: "green"} }>Link copied</span> }</> }</p>

                    </div>


                    { !edit.state && <div className={ `${ styles.cardBodySection } ${ styles.participantArea }` }
                                          onClick={ handleContactDetails }>
                      <h4>Teilnehmer:</h4>
                      <p> { props.contacts?.length }</p>
                    </div> }
                    {/*<div className={ styles.cardBodySection }>
                        <h4>Rückmeldungen:</h4>
                        <p>Sensitive: 10</p>
                        <p>Weiß nicht: 25</p>
                        <p>Nein: 19</p>
                    </div>*/ }
                </div>

                <div className={ styles.cardButtons }>
                    { props.ws_status === "confirmed" &&
                      <Button type={ "submit" } title={ "absagen" } action={ cancelMessageWindow }/> }
                    { props.ws_status === "cancelled" &&
                      <Button type={ "submit" } title={ "löschen" } action={ handleWSDelete }/> }
                    { props.ws_status != "cancelled" && <Button type={ "submit" } title={ "einladen" }/> }
                    { props.ws_status === "planned" &&
                      <Button type={ "submit" } title={ "bestätigen" } action={ handleConfirmWorkshop }/> }
                </div>
            </div>

            { contactDetails &&
              <WorkshopContactOverview contacts={ props.contacts } action={ handleContactDetails }/>
            }


        </div>
    </>


}

export default WorkshopCard