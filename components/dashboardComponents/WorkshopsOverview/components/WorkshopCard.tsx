'use client'
import styles from '@/styles/WorkshopsOverview.module.css'
import Button from "@/components/global/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faPen, faSave} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

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

    const [edit, setEdit] = useState(false);
    const [onClipboard, setOnClipboard] = useState(false);

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

    return <div className={ styles.cardWrapper }>
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


                <div className={ styles.cardBodySection }>
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
                <Button type={ "submit" } title={ "absagen" }/>
                <Button type={ "submit" } title={ "einladen" }/>
            </div>
        </div>

    </div>
}

export default WorkshopCard