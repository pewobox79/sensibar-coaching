'use client'
import styles from '@/styles/Formstyles.module.css'
import Button from "@/components/global/Button";
import {useModalOpen} from "@/stores/useModalOpen";
import {useFormik} from "formik";
import * as Yup from "yup";
import {createNewTreatmentItem, getTreatmentItemsByContact, TreatmentDataType} from "@/lib/strapi/treatmentHelper";
import {useState} from "react";
import ToastMessage from "@/components/global/ToastMessage";
import {useClientStore} from "@/stores/useClientStore";

const NewTreatmentForm = ({clientId, clientName}: { clientId: string, clientName:string }) => {

    const modalClose = useModalOpen().setTreatmentFormClose;
    const [success, setSuccess] = useState({state: false, msg: "", type: "success"});
    const [error, setError] = useState({state: false, msg: "", type: "error"});

    const INITIAL_FORM_VALUES = {
        title: "",
        type: "Erstberatung",
        details: "",
        location: "vor Ort",
        contact: clientId
    }

    const TreatmentSchema = Yup.object().shape({
        title: Yup.string().required("Titel ist erforderlich"),
        type: Yup.string().required("Typ ist erforderlich"),
        details: Yup.string().min(10, "Bitte mehr als 10 Zeichen schreiben!").required("Irgendwelche Notizen?"),
        location: Yup.string().required("Ort ist erforderlich"),

    })

    const formik = useFormik({
        initialValues: INITIAL_FORM_VALUES,
        validationSchema: TreatmentSchema,
        validateOnChange: false,
        onSubmit: async (values) => {
            //setProcessing(true)
            try {


                const formatedData = {
                    data: {...values}
                }

                const response = await createNewTreatmentItem(formatedData as TreatmentDataType)
                const newItemValue = await response

                if (newItemValue.msg === "neuer Eintrag hinzugefügt") {



                    const newTreatmentList = await getTreatmentItemsByContact(clientId)
                    useClientStore.getState().setClientData({treatment_notes: newTreatmentList?.data})

                    setSuccess({...success, state: true, msg: "Eintrag erfolgreich hinzugefügt"})
                    formik.resetForm();
                    setTimeout(() => {
                        modalClose()
                    }, 2000)
                } else {

                    setError({...error, state: true, msg: "Ein Fehler ist aufgetreten"})
                }

            } catch (err) {
                console.log(err)
            }


        }


    })
    return <div className={ styles.newTreatmentFormWrapper }>
        <div className={ styles.newTreatmentFormInner }>
            <div className={ styles.newTreatmentCloseButton }><Button type={ "submit" } action={ modalClose }
                                                                      title={ "schließen" }/></div>

            <h3>Neuer Eintrag</h3>
            <form onSubmit={ formik.handleSubmit } className={ styles.newTreatmentFormSection }>

                <div className={ styles.formItem }>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="title" name="title" defaultValue={ clientName.toUpperCase() }
                           className={ styles.inputFieldStyle }/>
                </div>

                <div className={ styles.formItem }>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" value={ formik.values.title }
                           onChange={ formik.handleChange } className={ styles.inputFieldStyle }/>
                    { formik.errors.title && <div className={ styles.inputErrorText }>{ formik.errors.title }</div> }
                </div>

                <div className={ styles.formItem }>
                    <label htmlFor="location">Ort</label>
                    <select id="location" name="location" value={ formik.values.location }
                            onChange={ formik.handleChange } className={ styles.inputFieldStyle }>
                        <option value={ "vor Ort" }>vor Ort</option>
                        <option value={ "online" }>online</option>
                        <option value={ "telefonisch" }>telefonisch</option>
                    </select>
                </div>

                <div className={ styles.formItem }>
                    <label htmlFor="type">Ort</label>
                    <select id="type" name="type" value={ formik.values.type }
                            onChange={ formik.handleChange } className={ styles.inputFieldStyle }>
                        <option value={ "Erstberatung" }>Erstberatung</option>
                        <option value={ "Folgeberatung" }>Folgeberatung</option>
                        <option value={ "Testung" }>Testung</option>
                    </select>
                </div>
                <div className={ styles.formItem }>
                    <label htmlFor="details">Details</label>
                    <textarea id="details" name="details" value={ formik.values.details }
                              onChange={ formik.handleChange } rows={ 10 }
                              className={ styles.textAreaStyle }></textarea>
                    { formik.errors.details &&
                      <div className={ styles.inputErrorText }>{ formik.errors.details }</div> }
                </div>
                <div className={ styles.formItem }>
                    <Button type="submit" title="speichern"/>
                </div>

            </form>
            { success.state && <ToastMessage state={ success } setState={ setSuccess }/> }
            { error.state && <ToastMessage state={ error } setState={ setError }/> }


        </div>
    </div>
}
export default NewTreatmentForm