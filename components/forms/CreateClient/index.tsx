'use client'

import {useFormik} from "formik";
import styles from '@/styles/Formstyles.module.css'
import Button from "@/components/global/Button";
import {createNewCoachee, formatDateToStrapiFormat} from "@/lib/strapi/generalHelper";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {useState} from "react";
import ToastMessage from "@/components/global/ToastMessage";
import * as yup from 'yup'

const CreateClient = () => {

    const token = useLocalStorage("sensiUser")?.value;
    const [success, setSuccess] = useState({state: false, msg: "Coachee angelegt", type: "success"});
    const [error, setError] = useState({state: false, msg: "Fehler beim Anlegen", type: "error"});

    const coacheeSchema = yup.object().shape({
        personalData: yup.object({
            firstname: yup.string().required("Vorname ist erforderlich"),
            lastname: yup.string().required("Nachname ist erforderlich"),
            birthdate: yup.date().required("Geburtsdatum ist erforderlich"),
            gender: yup.string().required("Geschlecht ist erforderlich")
        }),
        contact: yup.object({
            email: yup.string().email().required("E-Mail ist erforderlich"),
            phone: yup.string()
        }),
    })


    const formik = useFormik({
        validationSchema: coacheeSchema,
        validateOnChange: false,
        initialValues: {
            personalData: {
                firstname: '',
                lastname: '',
                birthdate: '',
                gender: 'male',
            },
            contact: {
                email: '',
                phone: ''
            },
            address: {
                street: '',
                streetNumber: '',
                city: '',
                zipCode: '',
                country: 'Deutschland'
            },
            condition_status: {
                sensitiveStatus: "unknown"
            },
            isPatient: true
        },
        onSubmit: async (values) => {

            const formatedData = {
                ...values,
                personalData: {
                    firstname: values.personalData.firstname.toLowerCase(),
                    lastname: values.personalData.lastname.toLowerCase(),
                    gender: values.personalData.gender,
                    birthdate: formatDateToStrapiFormat(values.personalData.birthdate)
                },
                contact: [{
                    email: values.contact.email.toLowerCase(),
                    phone: values.contact.phone
                }]
            }

            try {

                const response = await createNewCoachee(token.jwt, formatedData);
                if (response.msg === "coachee created") {
                    setSuccess({...success, state: true})
                    formik.resetForm();
                } else {
                    setError({...error, state: true})
                }


            } catch (e) {
                console.log("Error", e)
            }

        }
    })
    return <div className={ styles.newWorkshopWrapper }>
        <div className={ styles.workshopFormInner }>
            <div className={ styles.workshopFormHeader }>
                <h3>Neuen Coachee anlegen</h3>
            </div>
            <form onSubmit={ formik.handleSubmit }>
                <div className={ styles.workshopFormGroup }>
                    <div className={ styles.formItem }>
                        <label htmlFor="firstname">Vorname</label>
                        <input type="text" id="firstname" name="personalData.firstname"
                               value={ formik.values.personalData.firstname }
                               onChange={ formik.handleChange }/>
                        { formik.errors.personalData?.firstname &&
                          <p className={ styles.inputErrorText }>{ formik.errors.personalData?.firstname }</p> }
                    </div>
                    <div className={ styles.formItem }>
                        <label htmlFor="lastname">Nachname</label>
                        <input type="text" id="lastname" name="personalData.lastname"
                               value={ formik.values.personalData.lastname }
                               onChange={ formik.handleChange }/>
                        { formik.errors.personalData?.lastname &&
                          <p className={ styles.inputErrorText }>{ formik.errors.personalData?.lastname }</p> }
                    </div>

                    <div className={ styles.formItem }>
                        <label htmlFor="birthdate">Geburtsdatum</label>
                        <input type="date" id="birthdate" name="personalData.birthdate"
                               value={ formik.values.personalData.birthdate }
                               onChange={ formik.handleChange }/>

                        { formik.errors.personalData?.birthdate &&
                          <p className={ styles.inputErrorText }>{ formik.errors.personalData?.birthdate }</p> }
                    </div>


                </div>

                <div className={ styles.workshopFormGroup }>
                    <div className={ styles.formItem }>
                        <label htmlFor="phone">Telefon</label>
                        <input type="text" id="phone" name="contact.phone" value={ formik.values.contact.phone }
                               onChange={ formik.handleChange }/>
                        { formik.errors.contact?.phone &&
                          <p className={ styles.inputErrorText }>{ formik.errors.contact.phone }</p> }
                    </div>
                    <div className={ styles.formItem }>
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="contact.email" value={ formik.values.contact.email }
                               onChange={ formik.handleChange }/>
                        { formik.errors.contact?.email &&
                          <p className={ styles.inputErrorText }>{ formik.errors.contact.email }</p> }
                    </div>

                    <div className={ styles.formItem }>
                        <label htmlFor="gender">Geschlecht</label>
                        <select id="lastname" name="personalData.gender" value={ formik.values.personalData.gender }
                                onChange={ formik.handleChange }>
                            <option value="male">Männlich</option>
                            <option value="female">Weiblich</option>
                            <option value="diverse">Divers</option>
                        </select>
                        { formik.errors.personalData?.gender &&
                          <p className={ styles.inputErrorText }>{ formik.errors.personalData?.gender }</p> }
                    </div>

                    <div className={ styles.formItem }>
                        <label htmlFor="city">hochsensibel?</label>
                        <select id="city" name="condition_status.sensitiveStatus"
                                value={ formik.values.condition_status.sensitiveStatus }>
                            <option value={ "yes" }>Ja</option>
                            <option value={ "no" }>Nein</option>
                            <option value={ "unknown" }>Unbekannt</option>
                        </select>

                         { formik.errors.condition_status?.sensitiveStatus &&
                          <p className={ styles.inputErrorText }>{ formik.errors.condition_status?.sensitiveStatus }</p> }
                    </div>

                </div>

                <div className={ styles.workshopFormGroup }>

                    <div className={ styles.formItem }>
                        <label htmlFor="street">Strasse</label>
                        <input type="text" id="street" name="address.street" value={ formik.values.address.street }
                               onChange={ formik.handleChange }/>
                        { formik.errors.address?.street &&
                          <p className={ styles.inputErrorText }>{ formik.errors.address?.street }</p> }
                    </div>
                    <div className={ styles.formItem }>
                        <label htmlFor="streetNumber">Hausnummer</label>
                        <input type="text" id="streetNumber" name="address.streetNumber"
                               value={ formik.values.address.streetNumber }
                               onChange={ formik.handleChange }/>
                        { formik.errors.address?.streetNumber &&
                          <p className={ styles.inputErrorText }>{ formik.errors.address?.streetNumber }</p> }
                    </div>


                </div>
                <div className={ styles.workshopFormGroup }>

                    <div className={ styles.formItem }>
                        <label htmlFor="zipCode">PLZ</label>
                        <input type="text" id="zipCode" name="address.zipCode"
                               value={ formik.values.address.zipCode }
                               onChange={ formik.handleChange }/>
                        { formik.errors.address?.zipCode &&
                          <p className={ styles.inputErrorText }>{ formik.errors.address?.zipCode }</p> }
                    </div>
                    <div className={ styles.formItem }>
                        <label htmlFor="city">City</label>
                        <input type="text" id="city" name="address.city" value={ formik.values.address.city }
                               onChange={ formik.handleChange }/>
                        { formik.errors.address?.city &&
                          <p className={ styles.inputErrorText }>{ formik.errors.address?.city }</p> }
                    </div>

                    <div className={ styles.formItem }>
                        <label htmlFor="country">Land</label>

                        <select id="country" name="address.country" value={ formik.values.address.country }
                                onChange={ formik.handleChange }>

                            <option value="Deutschland">Deutschland</option>
                            <option value="Österreich">Österreich</option>
                            <option value="Schweiz">Schweiz</option>
                        </select>
                        { formik.errors.address?.country &&
                          <p className={ styles.inputErrorText }>{ formik.errors.address?.country }</p> }
                    </div>
                </div>


                <div style={ {margin: "30px 0"} }>
                    <Button type={ "submit" } title={ "neuer Coachee" }/>
                </div>

                { success.state && <ToastMessage state={ success } setState={ setSuccess }/> }
                { error.state && <ToastMessage state={ error } setState={ setError }/> }
            </form>
        </div>
    </div>
}

export default CreateClient