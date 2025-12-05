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
import * as Yup from "yup";


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
        country: "Deutschland",
        streetNumber: "",
        city: ""
    },
}


const WorkshopForm = () => {

    const [success, setSuccess] = useState({state: false, msg: "Neuer Workshop angelegt", type: "success"})
    const [error, setError] = useState({state: false, msg: "workshop konnte nicht angelegt werden", type: "error"})
    const token = useLocalStorage("sensiUser")


    const workshopSchema = Yup.object().shape({
        title: Yup.string()
            .min(2, 'Title is too short')
            .max(70, 'Title is too long')
            .required('Title is required'),

        type: Yup.string()
            .oneOf(['online', 'hybrid', 'inPerson'], 'Invalid workshop type')
            .required('Type is required'),

        link: Yup.object().shape({
            href: Yup.string()
                .url('Must be a valid URL')
                .when('$type', {
                    is: (type: string) => type === 'online' || type === 'hybrid',
                    then: (schema) => schema.required('Link is required'),
                    otherwise: (schema) => schema
                }),
        }),

        workshop_date: Yup.date()
            .required('Workshop date is required')
            .min(new Date(), 'Workshop date cannot be in the past'),

        description: Yup.string()
            .min(5, 'Description is too short')
            .required('Description is required'),

        ws_status: Yup.string()
            .oneOf(['planned', 'confirmed', 'cancelled', 'completed'], 'Invalid status')
            .required('Status is required'),

        workshopTimeStart: Yup.string()
            .required('Start time is required'),

        workshopTimeEnd: Yup.string()
            .required('End time is required')
            .test('is-after-start', 'End time must be after start time', function (value) {
                const {workshopTimeStart} = this.parent;
                if (!value || !workshopTimeStart) return true;
                return value > workshopTimeStart;
            }),

        location: Yup.object().shape({
            street: Yup.string()
                .when('$type', {
                    is: (type: string) => type === 'inPerson' || type === 'hybrid',
                    then: (schema) => schema.required('Street is required for in-person workshops'),
                    otherwise: (schema) => schema
                }),
            streetNumber: Yup.string()
                .when('$type', {
                    is: (type: string) => type === 'inPerson' || type === 'hybrid',
                    then: (schema) => schema.required('Street number is required for in-person workshops'),
                    otherwise: (schema) => schema
                }),
            zipCode: Yup.string()
                .matches(/^\d{5}$/, 'ZIP code must be 5 digits')
                .when('$type', {
                    is: (type: string) => type === 'inPerson' || type === 'hybrid',
                    then: (schema) => schema.required('ZIP code is required for in-person workshops'),
                    otherwise: (schema) => schema
                }),
            city: Yup.string()
                .when('$type', {
                    is: (type: string) => type === 'inPerson' || type === 'hybrid',
                    then: (schema) => schema.required('City is required for in-person workshops'),
                    otherwise: (schema) => schema
                }),
            country: Yup.string()
                .oneOf(['Deutschland', 'Österreich', 'Schweiz'], 'Invalid country')
                .required('Country is required')
        })
    });
    const formik = useFormik({
        validationSchema: workshopSchema,
        validateOnChange: false,
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
                       <p className={styles.inputErrorText}> {formik.errors.title}</p>
                    </div>


                    <div className={ styles.formItem }>
                        <label htmlFor={ "type" }>Format</label>
                        <select name={ "type" } id={ "type" } value={ formik.values.type }
                                onChange={ formik.handleChange }>
                            <option value={ "online" }>online</option>
                            <option value={ "hybrid" }>hybrid</option>
                            <option value={ "inPerson" }>vor Ort</option>
                        </select>
                        <p className={styles.inputErrorText}> {formik.errors.type}</p>
                    </div>
                    <div className={ styles.formItem }>
                        <label htmlFor={ "link" }>Weblink</label>
                        <input type={ "text" } name={ "link.href" } id={ "link" } value={ formik.values.link.href }
                               onChange={ formik.handleChange } placeholder={ "Zoom Link, Google Meet Link..." }/>
                        <p className={styles.inputErrorText}> {formik.errors?.link?.href}</p>
                    </div>

                </div>


                <div className={ styles.workshopFormGroup }>

                    <div className={ styles.formItem }>
                        <label htmlFor={ "workshop_date" }>Datum</label>
                        <input type={ "date" } name={ "workshop_date" } id={ "workshop_date" }
                               value={ formik.values.workshop_date }
                               onChange={ formik.handleChange }/>
                        <p className={styles.inputErrorText}> {formik.errors?.workshop_date}</p>
                    </div>
                    <div className={ styles.formItem }>
                        <label htmlFor={ "workshopTimeStart" }>Uhrzeit Start</label>
                        <input type={ "time" } min="07:00" max="23:00" name={ "workshopTimeStart" }
                               id={ "workshopTimeStart" }
                               value={ formik.values.workshopTimeStart }
                               onChange={ formik.handleChange }/>
                        <p className={styles.inputErrorText}> {formik.errors?.workshopTimeStart}</p>
                    </div>
                    <div className={ styles.formItem }>
                        <label htmlFor={ "workshopTimeEnd" }>Uhrzeit Ende</label>
                        <input type={ "time" } min="07:00" max="23:00" name={ "workshopTimeEnd" }
                               id={ "workshopTimeEnd" }
                               value={ formik.values.workshopTimeEnd }
                               onChange={ formik.handleChange }/>
                        <p className={styles.inputErrorText}> {formik.errors?.workshopTimeEnd}</p>
                    </div>
                </div>

                <h3>Veranstaltungsort</h3>
                <div className={ styles.workshopFormGroup }>

                    <div className={ styles.formItem }>
                        <label htmlFor={ "street" }>Strasse</label>
                        <input type={ "text" } name={ "location.street" } id={ "street" }
                               value={ formik.values.location.street }
                               onChange={ formik.handleChange }/>
                        <p className={styles.inputErrorText}> {formik.errors?.location?.street}</p>
                    </div>
                    <div className={ styles.formItem }>
                        <label htmlFor={ "streetNumber" }>Hausnummer</label>
                        <input type={ "text" } name={ "location.streetNumber" }
                               id={ "streetNumber" }
                               value={ formik.values.location.streetNumber }
                               onChange={ formik.handleChange }/>
                        <p className={styles.inputErrorText}> {formik.errors?.location?.streetNumber}</p>
                    </div>

                </div>
                <div className={ styles.workshopFormGroup }>
                    <div className={ styles.formItem }>
                        <label htmlFor={ "zipCode" }>Postleitzahl</label>
                        <input type={ "text" } name={ "location.zipCode" }
                               id={ "zipCode" }
                               value={ formik.values.location.zipCode }
                               onChange={ formik.handleChange }/>
                        <p className={styles.inputErrorText}> {formik.errors?.location?.zipCode}</p>
                    </div>
                    <div className={ styles.formItem }>
                        <label htmlFor={ "city" }>Ort</label>
                        <input type={ "text" } name={ "location.city" }
                               id={ "city" }
                               value={ formik.values.location.city }
                               onChange={ formik.handleChange }/>
                        <p className={styles.inputErrorText}> {formik.errors?.location?.city}</p>
                    </div>
                    <div className={ styles.formItem }>
                        <label htmlFor={ "country" }>Land</label>
                        <select name={ "type" } id={ "country" } value={ formik.values.location.country }
                                onChange={ formik.handleChange }>
                            <option value={ "Deutschland" }>Deutschland</option>
                            <option value={ "Österreich" }>Österreich</option>
                            <option value={ "Schweiz" }>Schweiz</option>
                        </select>
                    </div>
                    <p className={styles.inputErrorText}> {formik.errors?.location?.country}</p>
                </div>
                <div className={ styles.workshopFormGroup }>
                    <div className={ `${ styles.formItem } ${ styles.workshopDescriptionItem }` }>
                        <label htmlFor={ "description" }>Beschreibung</label>
                        <p className={styles.inputErrorText}> {formik.errors?.description}</p>
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