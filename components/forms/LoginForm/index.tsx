'use client'

import {Form} from 'react-bootstrap'
import {useFormik} from "formik";
import styles from '@/styles/Formstyles.module.css'
import * as yup from "yup";
import Button from "@/components/global/Button";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {useRouter} from "next/navigation";

const LoginForm = () => {
    const router = useRouter();
    const localStorage = useLocalStorage("sensiUser")
    const LoginSchema = yup.object().shape({
        identifier: yup.string().required('Email oder Username ist verpflichtend'),
        password: yup.string().required('Passwort ist verpflichtend')

    })

    const INITIAL_FORM_VALUES = {
        identifier: "",
        password: ""
    }

    const formik = useFormik({
        initialValues: INITIAL_FORM_VALUES,
        validationSchema: LoginSchema,
        validateOnChange: false,
        onSubmit: async (values) => {
            //setProcessing(true)

            const response = await fetch("/api/user/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })

            const data = await response.json()

            if (data) {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                localStorage && localStorage.setStoredValue({jwt: data.jwt, id: data.user.documentId})
              await router.replace("/admin")
            }
        }

    })
    return <>
        <div className={ styles.loginFormInner }>
            <div className={ styles.loginFormHeader }>
                <h2>User Login</h2>
            </div>
            <form onSubmit={ formik.handleSubmit } className={ styles.loginForm }>

                <div className={ styles.formItem }>
                    <Form.Control
                        type="text"
                        id="identifier"
                        placeholder="Email oder Username"
                        name={ "identifier" }
                        className={ formik.errors.identifier && styles.inputError }
                        value={ formik.values.identifier }
                        onChange={ formik.handleChange }
                    />
                    { formik.errors.identifier &&
                      <p className={ styles.inputErrorText }>{ formik.errors.identifier }</p> }
                </div>
                <div className={ styles.formItem }>
                    <Form.Control
                        type="password"
                        id="password"
                        placeholder="Passwort"
                        className={ formik.errors.password && styles.inputError }
                        value={ formik.values.password }
                        onChange={ formik.handleChange }
                        name={ "password" }
                    />
                    { formik.errors.password &&
                      <p className={ styles.inputErrorText }>{ formik.errors.password }</p> }
                </div>
                <div style={ {display: "flex", justifyContent: "center"} }>

                    <Button type={ "submit" } title={ "login" }/>

                </div>

            </form>
        </div>

    </>
}

export default LoginForm