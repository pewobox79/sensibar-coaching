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
    addContactToWorkshop, addTicketToExistingContact,
    checkIfContactExists, getSingleWorkshop,

} from "@/lib/strapi/workshopHelper";
import Loader from "@/components/global/Loader";
import {WorkshopTypes} from "@/types/generalTypes";
import {useOrderStore} from "@/stores/useOrderStore";
import {useRouter} from "next/navigation";
import {createNewTicket} from "@/lib/strapi/ticketHelper";
import {createNewPaymentInStrapi} from "@/lib/strapi/paymentHelper";


const EventRegistration = ({
                               documentId,
                               workshop_date,
                               title,
                               location,
                               type,
                               format,
                               workshopPrice,
                               speaker
                           }: WorkshopTypes) => {

    const router = useRouter()
    const STRAPI_URI = process.env.NEXT_PUBLIC_STRAPI_URL_DEV ? process.env.NEXT_PUBLIC_STRAPI_URL_DEV : ""
    const { addOrder} = useOrderStore()
    const [error, setError] = useState({state: false, msg: "", type: "error"});
    const [success, setSuccess] = useState({state: false, msg: "", type: "success"});
    const [registrationProcess, setRegistrationProcess] = useState(false);
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
        workshops: documentId,

    }


    const formik = useFormik({
        initialValues: INITIAL_FORM_VALUES,
        validationSchema: RegistrationSchema,
        validateOnChange: false,
        onSubmit: async (values) => {
            setRegistrationProcess(true)

            const {ticketId} = await createNewTicket(workshop_date, documentId)
            //const initPaymentData = await initNewTicketAndPayment(workshop_date, documentId)
            try {
                const cleanedFirstname = values.firstname.replace(/\s+/g, '').toLowerCase();
                const cleanedLastname = values.lastname.replace(/\s+/g, '').toLowerCase();
                const cleanedEmail = values.contact.email?.trim()?.toLowerCase();
                const data = await checkIfContactExists(cleanedFirstname, cleanedLastname, cleanedEmail)
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
                        event_tickets: [ticketId || ""],
                        condition_status: {
                            sensitiveStatus: values.condition,
                        },
                    }
                }

                const paymentData = await createNewPaymentInStrapi(ticketId)
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

                            const {documentId:ClientId, contact} = newData?.data


                            getSingleWorkshop(documentId).then(workshop => {
                                addOrder({
                                    ticketId: ticketId || "",
                                    clientId: ClientId,
                                    contactEmail: contact?.[0].email,
                                    workshopId: documentId || '',
                                    eventName: title,
                                    speaker,
                                    clientName: `${ values.firstname } ${ values.lastname }`,
                                    eventDate: workshop_date,
                                    eventLocation: location,
                                    ticketPrice: workshopPrice,
                                    eventType: type,
                                    billing: false,
                                    eventFormat: format,
                                    billingAddress: {
                                        street: "",
                                        city: "",
                                        streetNumber: "",
                                        zipCode: "",
                                        country: ""
                                    },
                                    rightOfWithdrawal: {
                                        hasAccepted: false,
                                        date: new Date()
                                    }
                                })
                                const updatedWorkshopData = {
                                    contactList: [workshop?.data?.contacts],
                                    ticketList: [workshop?.data?.event_tickets]
                                }
                                updatedWorkshopData.contactList.push(documentId)

                                addContactToWorkshop(newData.data.documentId, documentId, updatedWorkshopData).then(() => {
                                    setError({...error, state: false})
                                    setSuccess({...success, state: true, msg: "Your registration was successfully"})
                                    setTimeout(() => {
                                        setSuccess({...success, state: false})
                                        router.push(`/tickets/${ ticketId }?pid=${ paymentData?.documentId || "" }`)

                                    }, 3000)
                                })

                            })
                        })


                } else {

                    const {documentId:ContactId,contact} = data?.data[0]

                    addOrder({
                        ticketId,
                        clientId: ContactId,
                        eventName: title,
                        workshopId: documentId,
                        contactEmail: contact?.[0].email,
                        speaker,
                        clientName: `${ values.firstname } ${ values.lastname }`,
                        eventDate: workshop_date,
                        eventLocation: location,
                        eventType: type,
                        ticketPrice: workshopPrice,
                        billing: false,
                        eventFormat: format,
                        billingAddress: {
                            street: "",
                            city: "",
                            streetNumber: "",
                            zipCode: "",
                            country: ""
                        },
                        rightOfWithdrawal: {
                            hasAccepted: false,
                            date: new Date()
                        }
                    })
                    getSingleWorkshop(documentId).then((workshop) => {
                        const updatedWorkshopData = {
                            contactList: [workshop.data.contacts],
                            ticketList: [workshop.data.event_tickets]
                        }
                        updatedWorkshopData.contactList.push(documentId)

                        addTicketToExistingContact(ticketId, ContactId)
                        addContactToWorkshop(ContactId, documentId, updatedWorkshopData).then(() => {
                            setError({...error, state: false})
                            setSuccess({...success, state: true, msg: "Your registration was successfully"})
                            setTimeout(() => {
                                setSuccess({...success, state: false})
                                router.push(`/tickets/${ ticketId }?pid=${ paymentData?.documentId || "" }`)
                            }, 3000)
                        })
                    })
                }


            } catch (err) {
                console.log("catch", err)
            }
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
                    label={ "Ja, ich nehme teil." }
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

                { registrationProcess ? <Loader/> : <Button type={ "submit" } title={ "Weiter" }/> }

            </div>
            <div style={ {padding: "40px 0"} }>
                { error.state && <ToastMessage state={ error } setState={ setError }/> }
            </div>

        </form>
    </>
}

export default EventRegistration;