'use client'
import * as yup from 'yup'
import {Form, InputGroup} from 'react-bootstrap'
import {useFormik} from "formik";
import styles from '@/styles/Formstyles.module.css'
import Button from "@/components/global/Button";
import Link from "next/link";
import {useState} from "react";
import ToastMessage from "@/components/global/ToastMessage";

const EventRegistration = () => {

    const [error, setError] = useState({state: false, msg: "", type: "error"});
    const [success, setSuccess] = useState({state:false, msg: "", type: "success"});
    /*const [processing, setProcessing] = useState(false)*/
    const RegistrationSchema = yup.object().shape({
        firstname: yup.string().required(),
        lastname: yup.string().required(),
        gdpr: yup.boolean().oneOf([true], 'Die Datenschutzerklärung muss akzeptiert werden.'),
        participate: yup.boolean().oneOf([true], 'Wollen Sie teilnehmen?'),
        contact: yup.object({
            phone: yup.string(),
            email: yup.string().email().required()
        }),
        condition: yup.string(),
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
        condition: ""

    }


    const formik = useFormik({
        initialValues: INITIAL_FORM_VALUES,
        validationSchema: RegistrationSchema,
        validateOnChange: false,
        onSubmit: async (values) => {
            //setProcessing(true)

            try {
                const response = await fetch("/api/db/participant", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({...values, gdpr: false, workshop:"14214"}),
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${ response.status }`);
                }

                const data = await response.json()
                if(data.msg ==="Participant already exists"){
                    setSuccess({...success, state: false})
                    setError({...error, state: true, msg: "Participant already exists"})
                    //setProcessing(false)
                }else{
                    setError({...error, state: false})
                    setSuccess({...success, state: true, msg:"Your registration was successfully"})
                    //setProcessing(false)
                    formik.resetForm()
                    setTimeout(() =>{
                        setSuccess({...success, state: false})
                    }, 3000)


                }
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
                <InputGroup>
                    {/* Label */}
                    <Form.Label>Ich bin hochsensibel</Form.Label>
                    <Form.Check
                        type="radio"
                        label="Ja"
                        id="condition2"
                        name="condition"
                        value="2"
                        onChange={formik.handleChange}
                        checked={formik.values?.condition === '2'}

                    />
                    <Form.Check
                        type="radio"
                        label="Nein"
                        id="conditon0"
                        name="condition"
                        value="0"
                        onChange={formik.handleChange}
                        checked={formik.values.condition === '0'}

                    />

                    <Form.Check
                        type="radio"
                        label="Weiß ich nicht"
                        id="conditon1"
                        name="condition"
                        value="1"
                        onChange={formik.handleChange}
                        checked={formik.values.condition === '1'}

                    />
                </InputGroup>

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
            <div style={{padding: "40px 0"}}>
                {success.state && <ToastMessage state={success} setState={setSuccess}/>}
                {error.state && <ToastMessage state={error} setState={setError}/>}
            </div>

        </form>
    </>
}

export default EventRegistration;