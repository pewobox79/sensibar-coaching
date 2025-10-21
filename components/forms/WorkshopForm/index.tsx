'use client'

import styles from '@/styles/Formstyles.module.css'
import {useFormik} from "formik";
import Button from "@/components/global/Button";
import {createNewWorkshop, formatTimeToStrapiFormat} from "@/lib/strapi/workshopHelper";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {useState} from "react";
import ToastMessage from "@/components/global/ToastMessage";
import TextEditor from "@/components/global/TextEditor";
import {generateEditorJSONFormat} from "@/lib/strapi/textEditorHelper";


export interface FormValues {
    title: string,
    type: string,
    link: {
        href: string,
        active: boolean,
        target: string
    },
    workshop_date: string,
    description: string,
    ws_status: string,
    workshopTimeStart: string,
    workshopTimeEnd: string,
    location: {
        street: string,
        zipCode: string,
        country: string,
        streetNumber: string,
        city: string
    },
}

const INIT_WS_VALUES: FormValues = {
    title: '',
    type: 'online',
    link: {
        href: '',
        active: true,
        target: "external"
    },
    workshop_date: '',
    description: '',
    ws_status: "planned",
    workshopTimeStart: "",
    workshopTimeEnd: "",
    location: {
        street: "",
        zipCode: "",
        country: "",
        streetNumber: "",
        city: ""
    },
}


const WorkshopForm = () => {

    const [success, setSuccess] = useState({state: false, msg: "Neuer Workshop angelegt", type: "success"})
    const [error, setError] = useState({state: false, msg: "workshop konnte nicht angelegt werden", type: "error"})
    const token = useLocalStorage("sensiUser")

    const formik = useFormik({

        initialValues: INIT_WS_VALUES,
        onSubmit: async (values) => {

            generateEditorJSONFormat(values.description)
            const startTime = formatTimeToStrapiFormat(values.workshopTimeStart);
            const endTime = formatTimeToStrapiFormat(values.workshopTimeEnd);


            const richTextJSON = generateEditorJSONFormat(values.description)


            const newData = {
                data: {...values, workshopTimeEnd: endTime, workshopTimeStart: startTime, description: richTextJSON}
            }
            // TODO: Send the form data to the server
            try {

                const response = await createNewWorkshop(newData, token?.value?.jwt)

                if (response.msg === "neuer Workshop angelegt") {

                    setSuccess({...success, state: true})
                    formik.resetForm();

                } else {

                    setError({...error, state: true})
                }

            } catch (e) {
                console.error('Error generating new workshop:', e)
                setError({...error, state: true})

            }
        },
    })

    return <div className={ styles.newWorkshopWrapper }>
        { success.state && <ToastMessage state={ success } setState={ setSuccess }/> }

        <div className={ styles.workshopFormInner }>
            <div className={ styles.workshopFormHeader }>
                <h2>Neuen Workshop anlegen</h2>
            </div>

            <form onSubmit={ formik.handleSubmit } className={ styles.workshopForm }>
                <div className={ styles.workshopFormGroup }>
                    <div className={ styles.formItem }>
                        <label htmlFor={ "title" }>Workshop Name</label>
                        <input type={ "text" } name={ "title" } id={ "title" } value={ formik.values.title }
                               onChange={ formik.handleChange }/>
                    </div>

                    <div className={ styles.formItem }>
                        <label htmlFor={ "type" }>Format</label>
                        <select name={ "type" } id={ "type" } value={ formik.values.type }
                                onChange={ formik.handleChange }>
                            <option value={ "online" }>online</option>
                            <option value={ "hybrid" }>hybrid</option>
                            <option value={ "inPerson" }>vor Ort</option>
                        </select>
                    </div>
                    <div className={ styles.formItem }>
                        <label htmlFor={ "link" }>Weblink</label>
                        <input type={ "text" } name={ "link.href" } id={ "link" } value={ formik.values.link.href }
                               onChange={ formik.handleChange } placeholder={ "Zoom Link, Google Meet Link..." }/>
                    </div>
                </div>


                <div className={ styles.workshopFormGroup }>

                    <div className={ styles.formItem }>
                        <label htmlFor={ "workshop_date" }>Datum</label>
                        <input type={ "date" } name={ "workshop_date" } id={ "workshop_date" }
                               value={ formik.values.workshop_date }
                               onChange={ formik.handleChange }/>
                    </div>
                    <div className={ styles.formItem }>
                        <label htmlFor={ "workshopTimeStart" }>Uhrzeit Start</label>
                        <input type={ "time" } min="07:00" max="23:00" name={ "workshopTimeStart" }
                               id={ "workshopTimeStart" }
                               value={ formik.values.workshopTimeStart }
                               onChange={ formik.handleChange }/>
                    </div>
                    <div className={ styles.formItem }>
                        <label htmlFor={ "workshopTimeEnd" }>Uhrzeit Ende</label>
                        <input type={ "time" } min="07:00" max="23:00" name={ "workshopTimeEnd" }
                               id={ "workshopTimeEnd" }
                               value={ formik.values.workshopTimeEnd }
                               onChange={ formik.handleChange }/>
                    </div>
                </div>

                <h3>Veranstaltungsort</h3>
                <div className={ styles.workshopFormGroup }>

                    <div className={ styles.formItem }>
                        <label htmlFor={ "street" }>Strasse</label>
                        <input type={ "text" } name={ "location.street" } id={ "street" }
                               value={ formik.values.location.street }
                               onChange={ formik.handleChange }/>
                    </div>
                    <div className={ styles.formItem }>
                        <label htmlFor={ "streetNumber" }>Hausnummer</label>
                        <input type={ "text" } name={ "location.streetNumber" }
                               id={ "streetNumber" }
                               value={ formik.values.location.streetNumber }
                               onChange={ formik.handleChange }/>
                    </div>

                </div>
                <div className={ styles.workshopFormGroup }>
                    <div className={ styles.formItem }>
                        <label htmlFor={ "zipCode" }>Postleitzahl</label>
                        <input type={ "text" }  name={ "location.zipCode" }
                               id={ "zipCode" }
                               value={ formik.values.location.zipCode }
                               onChange={ formik.handleChange }/>
                    </div>
                    <div className={ styles.formItem }>
                        <label htmlFor={ "city" }>Ort</label>
                        <input type={ "text" } name={ "location.city" }
                               id={ "city" }
                               value={ formik.values.location.city }
                               onChange={ formik.handleChange }/>
                    </div>
                </div>
                <div className={ styles.workshopFormGroup }>
                    <div className={ `${ styles.formItem } ${ styles.workshopDescriptionItem }` }>
                        <label htmlFor={ "description" }>Beschreibung</label>
                        <TextEditor formik={ formik } fieldname={ "description" }/>
                    </div>
                </div>
                <div style={ {display: "flex", justifyContent: "center"} }>
                    <Button type={ "submit" } title={ "neuer workshop" }/>
                </div>
            </form>
        </div>
    </div>
}

export default WorkshopForm