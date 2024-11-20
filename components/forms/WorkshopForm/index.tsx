'use client'

import styles from '@/styles/Formstyles.module.css'
import {useFormik} from "formik";
import Button from "@/components/global/Button";
import {createNewWorkshop, formatTimeToStrapiFormat} from "@/lib/strapi/workshopHelper";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {useState} from "react";
import ToastMessage from "@/components/global/ToastMessage";


const INIT_WS_VALUES = {
    title: '',
    type: 'online',
    link:{
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
        street: "form test",
        zipCode: "85309",
        country: "Deutschland",
        streetNumber: "12",
        city: "Pörnbach"
    },
}
const WorkshopForm = () => {

    const [success, setSuccess] = useState({state: false, msg: "Neuer Workshop angelegt",type:"success"})
    const [error, setError] = useState({state: false, msg: "workshop konnte nicht angelegt werden", type:"error"})
    const token = useLocalStorage("sensiUser")

    const formik = useFormik({

        initialValues: INIT_WS_VALUES,
        onSubmit: async (values) => {

            const startTime = formatTimeToStrapiFormat(values.workshopTimeStart)
            const endTime = formatTimeToStrapiFormat(values.workshopTimeEnd)
            const newData ={
                data: {...values, workshopTimeEnd: endTime,workshopTimeStart: startTime}
            }
            // TODO: Send the form data to the server
            try{

                const response = await createNewWorkshop(newData, token?.value?.jwt)

                if(response.msg === "neuer Workshop angelegt"){

                    setSuccess({...success, state: true})
                    formik.resetForm();

                }else{

                    setError({...error, state: true})
                }

            }catch (e){
                console.error('Error generating new workshop:', e)
                setError({...error, state: true})

            }
        },
    })


    return <div className={ styles.newWorkshopWrapper }>
        {success.state && <ToastMessage state={success} setState={setSuccess}/>}

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
                    </div>

                    <div className={ styles.formItem }>
                        <label htmlFor={ "type" }>Format</label>
                        <select name={ "type" } id={ "type" } value={ formik.values.type }
                                onChange={ formik.handleChange }>
                            <option value={ "online" }>online</option>
                            <option value={ "hybrid" }>hybrid</option>
                            <option value={ "inPerson" }>vor Ort</option>
                        </select>
                    </div>
                    <div className={ styles.formItem }>
                        <label htmlFor={ "link" }>Weblink</label>
                        <input type={ "text" } name={ "link.href" } id={ "link" } value={ formik.values.link.href }
                               onChange={ formik.handleChange } placeholder={"Zoom Link, Google Meet Link..."}/>
                    </div>
                </div>


                <div className={ styles.workshopFormGroup }>

                    <div className={ styles.formItem }>
                        <label htmlFor={ "workshop_date" }>Datum</label>
                        <input type={ "date" } name={ "workshop_date" } id={ "workshop_date" }
                               value={ formik.values.workshop_date }
                               onChange={ formik.handleChange }/>
                    </div>
                    <div className={ styles.formItem }>
                        <label htmlFor={ "workshopTimeStart" }>Uhrzeit Start</label>
                        <input type={ "time" } min="09:00" max="18:00" name={ "workshopTimeStart" } id={ "workshopTimeStart" }
                               value={ formik.values.workshopTimeStart }
                               onChange={ formik.handleChange }/>
                    </div>
                    <div className={ styles.formItem }>
                        <label htmlFor={ "workshopTimeEnd" }>Uhrzeit Ende</label>
                        <input type={ "time" } min="09:00" max="18:00" name={ "workshopTimeEnd" } id={ "workshopTimeEnd" }
                               value={ formik.values.workshopTimeEnd }
                               onChange={ formik.handleChange }/>
                    </div>
                </div>


                <div className={ styles.workshopFormGroup }>
                    <div className={ `${styles.formItem} ${styles.workshopDescriptionItem}`  }>
                        <label htmlFor={ "description" }>Beschreibung</label>
                        <textarea name={ "description" } id={ "description" } cols={ 50 }
                                  rows={ 10 } onChange={ formik.handleChange }></textarea>
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