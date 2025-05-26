'use client'

import styles from "@/styles/Client.module.css";
import {useClientStore} from "@/stores/useClientStore";
import {useState} from "react";
import {updateTreatmentById} from "@/lib/strapi/treatmentHelper";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import ToastMessage from "@/components/global/ToastMessage";

const TreatmentItemDetails = () => {
    const token = useLocalStorage("sensiUser")?.value
    const clientContext = useClientStore()


    const [update, setUpdate] = useState(false);
    const [success, setSuccess] = useState({state: false, msg: "", type: "success"});
    const [error, setError] = useState({state: false, msg: "", type: "error"});
    const [data, setData] = useState({
        type: clientContext.clientData?.selectedClientDetails?.type,
        title: clientContext.clientData?.selectedClientDetails?.title,
        details: clientContext.clientData?.selectedClientDetails?.details,
        documentId: clientContext.clientData?.selectedClientDetails?.documentId
    })


    function handleUpdateTreatment() {
        setData({
            ...data,
            details: clientContext.clientData?.selectedClientDetails?.details,
            title: clientContext.clientData?.selectedClientDetails?.title
        })
        setUpdate(!update)

    }

    function handleChange(e: { target: { name: string, value: string } }) {

        setData({...data, [e.target.name]: e.target.value})
    }

    function handleUpdate() {
        const formatedData = {
            data: {title: data.title, details: data.details, type: data.type}
        }

        updateTreatmentById(clientContext.clientData?.selectedClientDetails?.documentId, formatedData, token.jwt).then(res => {

            if (res.msg === "failed") {

                setError({...error, state: true, msg: res.msg})
            } else {

                setSuccess({...success, state: true, msg: res.msg})
                setUpdate(!update)
            }

        })
    }

    return <div className={ styles.treatmentSplitRight }>
        <div className={ styles.detailsTypeInfoBlock }>
            { clientContext.clientData?.selectedClientDetails?.title && <h3>Art des Termins:</h3> }
            { !update ? <p>{ clientContext.clientData?.selectedClientDetails?.type }</p> :
                <select id="type" name="type" value={ data.type }
                        onChange={ handleChange } className={ styles.inputFieldStyle }>
                    <option value={ "Erstberatung" }>Erstberatung</option>
                    <option value={ "Folgeberatung" }>Folgeberatung</option>
                    <option value={ "Testung" }>Testung</option>
                </select> }
        </div>
        { clientContext.clientData?.selectedClientDetails?.title && <h3>Details</h3> }
        <div style={ {display: "flex", flexDirection: "column"} }>{ !update ?
            <div style={ {
                wordBreak: "break-word",
                marginBottom: 30
            } }>{ clientContext.clientData?.selectedClientDetails?.details }</div>
            : <textarea defaultValue={ data.details } name="details" onChange={ handleChange } rows={ 10 }
                        cols={ 40 }></textarea> }
            <div style={ {display: "flex", marginTop: 10} }>{ clientContext.clientData?.selectedClientDetails?.title &&

              <button className={ "globalButton" }
                      onClick={ !update ? handleUpdateTreatment : handleUpdate }>{ !update ? "edit" : "update" }</button> }
                { update &&
                  <button className={ "globalButton" } onClick={ handleUpdateTreatment }>cancel</button> }</div>
        </div>
        { success.state && <ToastMessage state={ success } setState={ setSuccess }/> }
        { error.state && <ToastMessage state={ error } setState={ setError }/> }
    </div>
}

export default TreatmentItemDetails