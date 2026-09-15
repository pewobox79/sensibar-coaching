'use client'
import {Form} from 'react-bootstrap'
import {useFormik} from "formik";
import * as yup from "yup";
import {useState} from "react";
import ToastMessage from "@/components/global/ToastMessage";
import styles from '@/styles/Formstyles.module.css'
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {LOCAL_STORAGE_KEY_ADVENT_SUBSCRIPTION} from "@/components/AdventCalendar/AdventCalenderSubscription";
import {createAdventSubscription} from "@/lib/strapi/generalHelper";
import {subscribeAdventCalender} from "@/utils/helper/registrationHelper";
import Link from "next/link";


const INITIAL_FORM_VALUES = {
    email: "",
    acceptedPolicy: false
}
const AdventCalendarSubscriptionForm = ({handleModal}: { handleModal: () => void }) => {

    const localStorage = useLocalStorage(LOCAL_STORAGE_KEY_ADVENT_SUBSCRIPTION, null)
    const [success, setSuccess] = useState({state: false, msg: "", type: "success"})
    const [error, setError] = useState({state: false, msg: "", type: "error"})
    const SubscriptionSchema = yup.object().shape({
        email: yup.string().email("Es muss eine gültige Email sein").required('Email ist verpflichtend'),
        acceptedPolicy: yup.boolean().required('Sie müssen die Datenschutzbestimmungen akzeptieren')
    })

    const formik = useFormik({
        initialValues: INITIAL_FORM_VALUES,
        validationSchema: SubscriptionSchema,
        validateOnChange: false,
        onSubmit: async (values) => {
            console.log("values", values)
            //setProcessing(true)
            const response = await createAdventSubscription(values)
            console.log("subscription response", response)
            if(response.msg === "This attribute must be unique"){
                setError({...error, state: true, msg: "Diese Email ist bereits abonniert"})
                return
            } else if (response.msg !== "subscription created") {
                setError({...error, state: true, msg: "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später noch einmal."})
                return
            } else {
                setSuccess({...success, state: true, msg: "Adventskalender wurde erfolgreich abonniert"})
                localStorage.setStoredValue(true)
                await subscribeAdventCalender({email: values.email, sid: response.data.documentId})
                setTimeout(() => handleModal(), 1500)
                return
            }
        }

    })
    return (
        <>
            <form onSubmit={ formik.handleSubmit }>
                <div className={ styles.formItem }>
                    <Form.Control type="text" name="email" placeholder="Email" value={ formik.values.email }
                                  onChange={ formik.handleChange }/>
                    { formik.errors.email && <p className={ styles.inputErrorText }>{ formik.errors.email }</p> }
                </div>
                <div className={ styles.formItem }>
                    <Form.Check
                        type={ "checkbox" }
                        id={ `acceptedPolicy` }
                        label={ <>Ich habe die <Link target={"_blank"} href="/datenschutzerklaerung" className={ "innerTextLinkStyle"}>Datenschutzbestimmungen</Link> gelesen und akzepiere diese.</> }
                        checked={ formik.values.acceptedPolicy }
                        onChange={ formik.handleChange }
                        name={ "acceptedPolicy" }
                    />
                    { formik.errors.acceptedPolicy &&
                      <p className={ styles.inputErrorText }>{ formik.errors.acceptedPolicy }</p> }
                </div>

                <div>
                    <button className={ "globalButton" } type={ "submit" }>Kalender abonnieren</button>
                </div>
            </form>

            { error && <ToastMessage state={ error } setState={ setError }/> }
            { success && <ToastMessage state={ success } setState={ setSuccess }/> }</>
    );
}

export default AdventCalendarSubscriptionForm