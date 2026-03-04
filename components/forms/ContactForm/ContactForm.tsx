'use client'
import Container from "@/components/global/Container";

import styles from "@/styles/ContactForm.module.css";
import Button from "@/components/global/Button";
import {ChangeEvent, useState} from "react";
import {ContactFormTypes, ToastMessageTypes} from "@/types/generalTypes";
import {handleFormSubmission} from "@/utils/helper/contactFormHelper";
import ToastMessage from "@/components/global/ToastMessage";


const INIT_VALUES = {name: '', email: '', message: ''}
const ContactForm = () => {

    const [formData, setFormData] = useState<ContactFormTypes>(INIT_VALUES)
    const [status, setStatus] = useState<ToastMessageTypes["state"]>({msg: '', state: false, type: 'success'})

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target
        setFormData(prev => ({...prev, [name]: value}))
    }

    async function handleSubmit() {

        const email = formData.email.trim()

        if (!email.includes('@') || !email.includes('.') ||email.includes(' ')) {
            setStatus({state: true, msg: 'Es muss ein gültige Email sein', type: 'error'})
            return
        }
        const response = await handleFormSubmission(formData)
        const msg = await response.response.msg
        setStatus({state: true, msg, type: 'success'})
        setFormData(INIT_VALUES)
    }

    return <Container id={ "contactForm" }>
        <div className={ styles.formWrapper }>
            <h3 className={ styles.formHeading }>Du hast noch Fragen?</h3>
            <form>
                <div className={ styles.formGroup }>
                    <label className={ styles.label } htmlFor="name">Deine Name</label>
                    <input className={ styles.inputField } type="text" id="name" name="name" value={formData.name} required
                           onChange={ handleChange }/>
                </div>
                <div className={ styles.formGroup }>
                    <label className={ styles.label } htmlFor="email">Deine Email:</label>
                    <input className={ styles.inputField } type="email" id="email" name="email" value={formData.email} required
                           onChange={ handleChange }/></div>
                <div className={ styles.formGroup }><label className={ styles.label }
                                                           htmlFor="message">Nachricht:</label>
                    <textarea className={ styles.inputField } id="message" name="message" value={formData.message} required cols={ 40 }
                              rows={ 5 } onChange={ handleChange }></textarea>
                </div>
            </form>
            <Button type={ "submit" } action={ handleSubmit } title={ "Schreib mir" } style={ {margin: '20px 0'} }/>
        </div>
        <ToastMessage state={ status } setState={ setStatus }/>
    </Container>
}

export default ContactForm