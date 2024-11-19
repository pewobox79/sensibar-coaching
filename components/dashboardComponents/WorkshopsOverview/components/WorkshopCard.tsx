'use client'
import styles from '@/styles/WorkshopsOverview.module.css'
import Button from "@/components/global/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faPen, faSave} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import WorkshopContactOverview
    from "@/components/dashboardComponents/WorkshopsOverview/components/WorkshopContactOverview";
import {generateMailingList} from "@/lib/strapi/workshopHelper";
import ToastMessage from "@/components/global/ToastMessage";
import WorkshopCancelWindow from "@/components/dashboardComponents/WorkshopsOverview/components/WorkshopCancelWindow";

const WorkshopCard = (props: {
    key: string,
    documentId: string,
    title: string,
    workshop_date: string,
    link: { href: string, target: string, label: string },
    type: string,
    ws_status: string,
    contacts: []
}) => {

    const [contactDetails, setContactDetails] = useState(false)
    const [edit, setEdit] = useState(false);
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

        setEdit(!edit)
    }

    function handleEditFeature() {
        setEdit(!edit)
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
                const data = await cancelResponse.json()


                if (data.msg === "email successfully sent") {

                    setSuccess({...success, state: true})
                }
            } else {
                setError({...error, state: true,})
            }
        } catch (e) {
            console.error('Error generating mailing list:', e)
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
                { edit ? <div className={ styles.editButton } onClick={ handleUpdateWorkshop }>
                        <FontAwesomeIcon icon={ faSave }/></div> :
                    <div className={ styles.editButton } onClick={ handleEditFeature }>
                        <FontAwesomeIcon icon={ faPen }/></div> }

                <div className={ styles.cardBody }>
                    <h4 style={ {textAlign: "center"} }>{ props?.title }</h4>
                    <div className={ styles.cardBodySection }>
                        <h4>Details:</h4>
                        <p>Datum: { props.workshop_date }</p>
                        <p>Status: { props?.ws_status }</p>
                    </div>

                    <div className={ styles.cardBodySection }>
                        <p>Location: { props?.type }</p>
                        <p><a href={ `${ props?.link?.href }` } title={ `${ props.link?.label }` }
                              target={ `${ props.link?.target }` }>Weblink</a>
                        </p>
                        <p><FontAwesomeIcon icon={ faCopy } onClick={ () => handleCopyLink() }/> { onClipboard &&
                          <span style={ {color: "green"} }>Link copied</span> }</p>

                    </div>


                    <div className={ `${ styles.cardBodySection } ${ styles.participantArea }` }
                         onClick={ handleContactDetails }>
                        <h4>Teilnehmer:</h4>
                        <p> { props.contacts?.length }</p>
                    </div>
                    <div className={ styles.cardBodySection }>
                        <h4>Rückmeldungen:</h4>
                        <p>Sensitive: 10</p>
                        <p>Weiß nicht: 25</p>
                        <p>Nein: 19</p>
                    </div>
                </div>

                <div className={ styles.cardButtons }>
                    <Button type={ "submit" } title={ "absagen" } action={ cancelMessageWindow }/>
                    <Button type={ "submit" } title={ "einladen" }/>
                </div>
            </div>

            { contactDetails &&
              <WorkshopContactOverview contacts={ props.contacts } action={ handleContactDetails }/>
            }


        </div>
    </>


}

export default WorkshopCard