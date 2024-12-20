'use client'
import * as yup from 'yup'
import {Form, InputGroup} from 'react-bootstrap'
import {useFormik} from "formik";
import styles from '@/styles/Formstyles.module.css'
import Button from "@/components/global/Button";
import Link from "next/link";
import {useState} from "react";
import ToastMessage from "@/components/global/ToastMessage";
import {
    addContactToWorkshop,
    checkIfContactExists, getSingleWorkshop,

} from "@/lib/strapi/workshopHelper";
import EmailInfo from "@/components/global/EmailInfo";
import Loader from "@/components/global/Loader";


const EventRegistration = ({workshopId, workshopName}: { workshopId: string, workshopName: string }) => {
    const STRAPI_URI = process.env.NEXT_PUBLIC_STRAPI_URL_DEV ? process.env.NEXT_PUBLIC_STRAPI_URL_DEV : ""

    const [error, setError] = useState({state: false, msg: "", type: "error"});
    const [success, setSuccess] = useState({state: false, msg: "", type: "success"});
    const [registrationProcess, setRegistrationProcess] = useState(false);
    const [emailInfo, setEmailInfo] = useState(false);

    const RegistrationSchema = yup.object().shape({
        firstname: yup.string().required('Vorname ist verpflichtend'),
        lastname: yup.string().required('Nachname ist verpflichtend'),
        gdpr: yup.boolean().oneOf([true], 'Die Datenschutzerklärung muss akzeptiert werden.'),
        participate: yup.boolean().oneOf([true], 'Wollen Sie teilnehmen?'),
        contact: yup.object({
            phone: yup.string(),
            email: yup.string().email().required('Email is verpflichtend')
        }),
        condition: yup.string().required('Für den Workshop hilfreich zu wissen')
    })

    const INITIAL_FORM_VALUES = {
        firstname: '',
        lastname: '',
        gdpr: false,
        participate: false,
        contact: {
            email: '',
            phone: '',
        },
        condition: "",
        workshops: workshopId,

    }


    const formik = useFormik({
        initialValues: INITIAL_FORM_VALUES,
        validationSchema: RegistrationSchema,
        validateOnChange: false,
        onSubmit: async (values) => {

            setRegistrationProcess(true)
            const cleanedFirstname = values.firstname.replace(/\s+/g, '').toLowerCase();
            const cleanedLastname = values.lastname.replace(/\s+/g, '').toLowerCase();
            const cleanedEmail = values.contact.email?.trim()?.toLowerCase();

            checkIfContactExists(cleanedFirstname, cleanedLastname, cleanedEmail).then(data => {
                const dataMapping = {
                    data: {
                        personalData: {
                            firstname: cleanedFirstname,
                            lastname: cleanedLastname
                        },
                        contact: [{
                            email: values.contact.email,
                            phone: values.contact.phone
                        }],
                        gdpr: !values.gdpr,
                        condition_status: {
                            sensitiveStatus: values.condition,
                        },
                    }
                }


                if (data?.msg === "new contact") {

                    const config = {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${ process.env.NEXT_PUBLIC_STRAPI_BEARER_TOKEN ? process.env.NEXT_PUBLIC_STRAPI_BEARER_TOKEN : "" }`
                        },
                        body: JSON.stringify(dataMapping)
                    }


                    fetch(`${ STRAPI_URI }/api/contacts/?populate=*`, config).then(response => response.json())
                        .then(newData => {

                            const newContactId = newData.data.documentId


                            getSingleWorkshop(workshopId).then(workshop => {


                                const updatedArray = [workshop.data.contacts]
                                updatedArray.push(newContactId)


                                addContactToWorkshop(newData.data.documentId, workshopId, updatedArray).then(() => {
                                    setRegistrationProcess(false)
                                    setError({...error, state: false})
                                    setSuccess({...success, state: true, msg: "Your registration was successfully"})
                                    formik.resetForm()
                                    setTimeout(() => {
                                        setSuccess({...success, state: false})
                                        setEmailInfo(true)

                                    }, 3000)

                                    fetch('/api/db/participant', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            id: newData.data?.documentId,
                                            workshopName: workshopName,
                                            workshopId: workshopId,
                                            email: newData?.data?.contact[0].email
                                        }),
                                    })

                                })

                            })
                        })


                } else {

                    const existingContactId = data?.data[0].documentId
                    //handle update existing contact

                    getSingleWorkshop(workshopId).then((workshop) => {

                        const updatedArray = [workshop.data.contacts]
                        updatedArray.push(existingContactId)


                        addContactToWorkshop(existingContactId, workshopId, updatedArray).then(() => {
                            setRegistrationProcess(false)
                            setError({...error, state: false})
                            setSuccess({...success, state: true, msg: "Your registration was successfully"})
                            formik.resetForm()
                            setTimeout(() => {
                                setSuccess({...success, state: false})
                                setEmailInfo(true)
                            }, 3000)

                            fetch('/api/db/participant', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    id: existingContactId,
                                    email: data?.data[0].contact[0].email,
                                    workshopName: workshopName,
                                    workshopId: workshopId,
                                }),
                            })

                        })


                    })


                }

            })
        }


    })

    return <>
        <form onSubmit={ formik.handleSubmit }>
            <div className={ styles.eventRegistrationHeader }><h3>Anmeldung</h3></div>
            <div className={ styles.formItem }>
                <Form.Control
                    type="text"
                    id="firstname"
                    placeholder="Vorname"
                    name={ "firstname" }
                    className={ formik.errors.firstname && styles.inputError }
                    value={ formik.values.firstname }
                    onChange={ formik.handleChange }
                />
                { formik.errors.firstname && <p className={ styles.inputErrorText }>{ formik.errors.firstname }</p> }
            </div>
            <div className={ styles.formItem }>
                <Form.Control
                    type="text"
                    id="lastname"
                    placeholder="Nachname"
                    className={ formik.errors.firstname && styles.inputError }
                    value={ formik.values.lastname }
                    onChange={ formik.handleChange }
                    name={ "lastname" }
                />
                { formik.errors.lastname && <p className={ styles.inputErrorText }>{ formik.errors.lastname }</p> }
            </div>
            <div className={ styles.formItem }>
                <Form.Control
                    type="text"
                    id="contact.email"
                    placeholder="E-Mail Adresse"
                    className={ formik.errors.contact?.email && styles.inputError }
                    value={ formik.values.contact?.email }
                    onChange={ formik.handleChange }
                    inputMode={ "email" }
                    name={ "contact.email" }
                />
                { formik.errors.contact?.email &&
                  <p className={ styles.inputErrorText }>{ formik.errors.contact?.email }</p> }
            </div>
            <div className={ styles.formItem }>
                <Form.Control
                    type="text"
                    id="contact.phone"
                    placeholder="Telefon Nummer (optional)"
                    className={ formik.errors.contact?.phone && styles.inputError }
                    value={ formik.values.contact?.phone }
                    onChange={ formik.handleChange }
                    inputMode={ "tel" }
                    name={ "contact.phone" }
                />
                { formik.errors.contact?.phone &&
                  <p className={ styles.inputErrorText }>{ formik.errors.contact?.phone }</p> }
            </div>
            <div className={ styles.formItem }>
                <InputGroup>
                    {/* Label */ }
                    <Form.Label>Ich bin hochsensibel</Form.Label>
                    <Form.Check
                        type="radio"
                        label="Ja"
                        id="condition2"
                        name="condition"
                        value="yes"
                        onChange={ formik.handleChange }
                        checked={ formik.values?.condition === 'yes' }

                    />
                    <Form.Check
                        type="radio"
                        label="Nein"
                        id="conditon0"
                        name="condition"
                        value="no"
                        onChange={ formik.handleChange }
                        checked={ formik.values.condition === 'no' }

                    />

                    <Form.Check
                        type="radio"
                        label="Weiß ich nicht"
                        id="conditon1"
                        name="condition"
                        value="unknown"
                        onChange={ formik.handleChange }
                        checked={ formik.values.condition === 'unknown' }

                    />
                </InputGroup>
                { formik.errors.condition &&
                  <p className={ styles.inputErrorText }>{ formik.errors.condition }</p> }
            </div>
            <div className={ styles.formItem }>
                <Form.Check // prettier-ignore
                    type={ "checkbox" }
                    id={ `participate` }
                    label={ "Ich nehme an dem kostenlosen Infoabend zum Thema Hochsensibiltät teil." }
                    checked={ formik.values.participate }
                    onChange={ formik.handleChange }
                    name={ "participate" }
                />
                { formik.errors.participate &&
                  <p className={ styles.inputErrorText }>{ formik.errors.participate }</p> }
            </div>


            <div className={ styles.formItem }>

                <Form.Check // prettier-ignore
                    type={ "checkbox" }
                    id={ `gdpr` }
                    label={ "Ich habe die Datenschutzbestimmungen gelesen und akzepiere diese." }
                    checked={ formik.values.gdpr }
                    onChange={ formik.handleChange }
                    name={ "gdpr" }
                />
                { formik.errors.gdpr && <p className={ styles.inputErrorText }>{ formik.errors.gdpr }</p> }
                <Link href={ "/datenschutz" } title={ "datenschutz bestimmungen" }
                      target={ "_blank" } className={ "innerTextLinkStyle" }>Zur Datenschutzbestimmung</Link>
            </div>
            <div style={ {display: "flex", justifyContent: "center"} }>

                { registrationProcess ? <Loader/> : <Button type={ "submit" }/> }

            </div>
            <div style={ {padding: "40px 0"} }>
                { emailInfo && <EmailInfo setEmailInfo={ setEmailInfo }/> }
                { success.state && <ToastMessage state={ success } setState={ setSuccess }/> }
                { error.state && <ToastMessage state={ error } setState={ setError }/> }
            </div>

        </form>
    </>
}

export default EventRegistration;