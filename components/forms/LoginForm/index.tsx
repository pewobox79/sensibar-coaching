'use client'

import {Form} from 'react-bootstrap'
import {useFormik} from "formik";
import styles from '@/styles/Formstyles.module.css'
import * as yup from "yup";
import Button from "@/components/global/Button";

const LoginForm =()=>{

    const LoginSchema = yup.object().shape({
        firstname: yup.string().required('Vorname ist verpflichtend'),
        lastname: yup.string().required('Nachname ist verpflichtend'),
        contact: yup.object({
            email: yup.string().email().required('Email is verpflichtend')
        }),
    })

    const INITIAL_FORM_VALUES = {
        firstname: '',
        lastname: '',
        contact: {
            email: '',
            phone: '',
        }
    }

    const formik = useFormik({
        initialValues: INITIAL_FORM_VALUES,
        validationSchema: LoginSchema,
        validateOnChange: false,
        onSubmit: async (values) => {
            //setProcessing(true)
            console.log(values)

        }

    })
    return <>

        <form onSubmit={ formik.handleSubmit } className={styles.loginForm}>

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
            <div style={ {display: "flex", justifyContent: "center"} }>

                <Button type={ "submit" } title={"login"}/>

            </div>

        </form>

    </>
}

export default LoginForm