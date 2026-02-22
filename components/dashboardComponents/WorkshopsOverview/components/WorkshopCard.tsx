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
import {isPastEvent} from "@/utils/helper/strapiHelper";
import {createWorkshopLink} from "@/utils/helper/formater";

const WorkshopCard = (props: {
    key: string,
    documentId: string,
    title: string,
    workshop_date: string,
    link: { href: string, target: string, label: string },
    type: string,
    format: string
    ws_status: string,
    contacts: [],
    description: [],
    workshopTimeStart: string,
    workshopTimeEnd: string,
    location:{city: string, street: string, streetNumber: string, zipCode: string, country: string},
}) => {

    const INIT_WS_VALUES = {
        documentId: props.documentId,
        title: props.title,
        workshop_date: props.workshop_date,
        link: {href: props.link?.href, target: props.link?.target,},
        type: props.type,
        format: props.format,
        ws_status: props.ws_status,
        workshopTimeStart: props.workshopTimeStart,
        workshopTimeEnd: props.workshopTimeEnd,
        city: props.location.city,
        zipCode: props.location.zipCode,
        country: props.location.country,
        street: props.location.street,
        streetNumber: props.location.streetNumber,
    }

    const token = useLocalStorage("sensiUser")?.value
    const eventIsInThePast = isPastEvent(props.workshop_date)
    const [contactDetails, setContactDetails] = useState(false)
    const [edit, setEdit] = useState({state: false, values: INIT_WS_VALUES});
    const [onClipboard, setOnClipboard] = useState({zoomLink: false, wsLink: false});
    const [success, setSuccess] = useState({state: false, type: "success", msg: "Absage Emails versendet"});
    const [error, setError] = useState({state: false, type: "error", msg: "absage konnte nicht verschickt werden"});
    const [openCancel, setOpenCancel] = useState(false);

    function handleCopyLink(string:string, type: 'zoomLink' |'wsLink') {
        navigator.clipboard.writeText(string).then(() => {
            setOnClipboard({...onClipboard, [type]: !onClipboard[type]});
        });

        setTimeout(() => {
            setOnClipboard({...onClipboard, [type]: !onClipboard[type]})
        }, 2000);
    }

    async function handleUpdateWorkshop() {

        const updatedData = {
            title: edit.values.title,
            workshop_date: edit.values.workshop_date,
            link: {href: edit.values.link?.href},
            type: edit.values.type,
            format: edit.values.format,
            ws_status: edit.values.ws_status,
            workshopTimeStart: formatTimeToStrapiFormat(edit.values.workshopTimeStart),
            workshopTimeEnd: formatTimeToStrapiFormat(edit.values.workshopTimeEnd),
            location:{
                city: edit.values.city,
                street: edit.values.street,
                streetNumber: edit.values.streetNumber,
                zipCode: edit.values.zipCode,
                country: edit.values.country,
            }


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
        if (event.target.name === "href") {
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
                { eventIsInThePast && <p className={styles.eventIsInPast}>Workshop liegt in der Vergangenheit!</p>}
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


                        { edit.state ?
                            <WsEditItem type={ "text" } value={ edit.values.city } property={ "city" }
                                        changeAction={ handleChange }/> :
                            <p>Stadt: { edit.values.city }</p> }

                        { edit.state ?
                            <WsEditItem type={ "text" } value={ edit.values.street } property={ "street" }
                                        changeAction={ handleChange }/> :
                            <p>Strasse: { edit.values.street }</p> }


                        { edit.state ?
                            <WsEditItem type={ "text" } value={ edit.values.streetNumber } property={ "streetNumber" }
                                        changeAction={ handleChange }/> :
                            <p>Nr: { edit.values.streetNumber }</p> }

                        { edit.state ?
                            <WsEditItem type={ "text" } value={ edit.values.zipCode } property={ "zipCode" }
                                        changeAction={ handleChange }/> :
                            <p>ZipCode: { edit.values.zipCode }</p> }





                    </div>

                    <div className={ styles.cardBodySection }>

                    </div>

                    <div className={ styles.cardBodySection }>
                        { edit.state ? <WsEditItem type={ "select" } value={ edit.values.type as string }
                                                   property={ "type" } changeAction={ handleChange }/> :
                            <p>Location: { edit.values?.type }</p> }

                        { edit.state ? <WsEditItem type={ "select" } value={ edit.values.format as string }
                                                   property={ "format" } changeAction={ handleChange }/> :
                            <p>Format: { edit.values?.format }</p> }
                        { edit.state ?
                            <WsEditItem type={ "text" } value={ edit.values.link.href as string } property={ "href" }
                                        changeAction={ handleChange }/> :
                            <p>
                                <a href={ `${ edit.values?.link?.href }` } title={ `${ props.link?.label }` }
                                  target={ `${ edit.values.link?.target }` }>Zoom Link</a>
                                <FontAwesomeIcon icon={ faCopy } style={{paddingLeft: 8}}
                                                 onClick={ () => handleCopyLink(edit.values?.link?.href, "zoomLink") }/>
                                { onClipboard.zoomLink &&
                                  <span style={ {color: "green"} }>Link copied</span> }
                            </p>
                        }
                        { edit.state ?
                            <div style={{paddingBottom: 60}}></div>:
                            <p>
                                Workshop Link
                                <FontAwesomeIcon icon={ faCopy } style={{paddingLeft: 8}}
                                                 onClick={ () => handleCopyLink(createWorkshopLink(props.title, props.documentId), "wsLink") }/>
                                { onClipboard.wsLink &&
                                  <span style={ {color: "green"} }>Link copied</span> }
                            </p>
                        }

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

                {!eventIsInThePast && <div className={ styles.cardButtons }>
                    { props.ws_status === "confirmed" &&
                      <Button type={ "submit" } title={ "absagen" } action={ cancelMessageWindow }/> }
                    { props.ws_status === "cancelled" &&
                      <Button type={ "submit" } title={ "löschen" } action={ handleWSDelete }/> }
                    { props.ws_status != "cancelled" && <Button type={ "submit" } title={ "einladen" }/> }
                    { props.ws_status === "planned" &&
                      <Button type={ "submit" } title={ "bestätigen" } action={ handleConfirmWorkshop }/> }
                </div>}
            </div>

            { contactDetails &&
              <WorkshopContactOverview contacts={ props.contacts } action={ handleContactDetails }/>
            }


        </div>
    </>


}

export default WorkshopCard