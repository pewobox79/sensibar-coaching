'use client'
import * as yup from 'yup'
import {Form} from 'react-bootstrap'
import {useFormik} from "formik";
import styles from '@/styles/Formstyles.module.css'
import Button from "@/components/global/Button";
import Link from "next/link";

const EventRegistration = () => {

    const RegistrationSchema = yup.object().shape({
        firstname: yup.string().required(),
        lastname: yup.string().required(),
        gdpr: yup.boolean().oneOf([true], 'Die Datenschutzerklärung muss akzeptiert werden.'),
        participate: yup.boolean().oneOf([true], 'Wollen Sie teilnehmen?'),
        contact: yup.object({
            phone: yup.string(),
            email: yup.string().email().required()
        })
    })

    const INITIAL_FORM_VALUES = {
        firstname: '',
        lastname: '',
        gdpr: false,
        participate: false,
        contact: {
            email: '',
            phone: '',
        }

    }


    const formik = useFormik({
        initialValues: INITIAL_FORM_VALUES,
        validationSchema: RegistrationSchema,
        validateOnChange: false,
        onSubmit: async (values) => {
            console.log("values", values)

            try {
                const response = await fetch("/api/db/user", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({...values, workshop:"14214"}),
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${ response.status }`);
                }

                const data = await response.json()
                console.log(data)
            } catch (err) {
                console.log("error", err)
            }
        }
    })

    return <>
        <form onSubmit={ formik.handleSubmit }>
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
                    name={ "contact.phone" }
                />
                { formik.errors.contact?.phone &&
                  <p className={ styles.inputErrorText }>{ formik.errors.contact?.phone }</p> }
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
            </div>
            <div className={ styles.formItem }>
                <Link href={ "/datenschutz" } title={ "datenschutz bestimmungen" }
                      target={ "_blank" }> Datenschutzbestimmungen lesen</Link>
                <Form.Check // prettier-ignore
                    type={ "checkbox" }
                    id={ `gdpr` }
                    label={ "Ich habe die Datenschutzbestimmungen gelesen und akzepiere diese." }
                    checked={ formik.values.gdpr }
                    onChange={ formik.handleChange }
                    name={ "gdpr" }
                />
                { formik.errors.gdpr && <p className={ styles.inputErrorText }>{ formik.errors.gdpr }</p> }
            </div>
            <div style={ {display: "flex", justifyContent: "center"} }>

                <Button/>
            </div>

        </form>
    </>
}

export default EventRegistration;