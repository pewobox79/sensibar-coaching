'use client'

import styles from '@/styles/Client.module.css'
import DetailItem from "@/components/dashboardComponents/Client/ContactDetails/components/DetailItem";
import {ClientData} from "@/stores/useClientStore";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faSave} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import EditItem from "@/components/dashboardComponents/Client/ContactDetails/components/EditItem";
import {updateContact} from "@/lib/strapi/generalHelper";
import ToastMessage from "@/components/global/ToastMessage";
import {useLocalStorage} from "@/hooks/useLocalStorage";


const ContactDetails = ({context}: { context: ClientData }) => {

    const token = useLocalStorage("sensiUser")?.value
    const [edit, setEdit] = useState(false)
    const [success, setSuccess]=useState({state: false, type: "success", msg:"Kontakt aktualisiert"})
    const [error, setError]=useState({state: false, type: "error", msg:""})

    function handleEditFeature() {
        setEdit(!edit)
    }

    async function handleUpdateContact() {

        //remove Id´s to update the data => required
        delete context?.personalData?.id
        delete context?.contact[0]?.id
        delete context?.address?.id
        updateContact(context, context.documentId, token.jwt).then((value) => {
            const typedValue = value as { msg: string; status: string; data: undefined; err: undefined };
            if(typedValue.msg === "update failed"){

                setError({...error, state: true, msg: typedValue.status})
            }else{

                setSuccess({...success, state: true})
            }


        })
        setEdit(false)

    }

    return <div className={ "innerWrapper" }>
        { success.state && <ToastMessage state={success} setState={setSuccess}/> }
        { error.state && <ToastMessage state={error} setState={setError}/> }
        <div className={ styles.contactDetailsWrapper }>
            { edit ? <div className={ styles.editButton } onClick={ handleUpdateContact }>
                    <FontAwesomeIcon icon={ faSave }/></div> :
                <div className={ styles.editButton } onClick={ handleEditFeature }>
                    <FontAwesomeIcon icon={ faPen }/></div> }
            <div className={ styles.contactDetailsSection }>
                <h3>Person:</h3>
                { edit ? <EditItem value={ context?.personalData?.firstname as string } name={ "firstname" } property={"personalData"}/> :
                    <DetailItem title={ context?.personalData?.firstname as string } category={ "vorname" }/> }
                { edit ? <EditItem value={ context?.personalData?.lastname as string } name={ "lastname" } property={"personalData"}/> :
                    <DetailItem title={ context?.personalData?.lastname as string } category={ "nachname" }/> }
                { edit? <EditItem value={ context?.personalData?.gender as string } name={ "gender" } property={"personalData"}/> :
                    <DetailItem title={ context?.personalData?.gender as string } category={ "geschlecht" }/> }
                { edit? <EditItem value={ context?.personalData?.birthdate as string } name={ "birthdate" } property={"personalData"}/> :
                    <DetailItem title={ context?.personalData?.birthdate as string } category={ "geburtstag" }/> }

            </div>


            <div className={ styles.contactDetailsSection }>
                <h3>Kontakt:</h3>
                { edit ? <EditItem value={ context.contact[0].phone as string } name={ "phone" } property={"contact"}/> :<DetailItem title={ context.contact[0].phone as string } category={ "telefon" }/>}
                { edit ? <EditItem value={ context.contact[0].email as string } name={ "email" } property={"contact"}/> :<DetailItem title={ context.contact[0].email as string } category={ "email" }/>}
            </div>

            <div className={ styles.contactDetailsSection }>
                <h3>Addresse:</h3>
                { edit ? <EditItem value={ context.address?.street as string } name={ "street" } property={"address"}/> :<DetailItem title={ context.address?.street as string } category={ "strasse" }/>}
                { edit ? <EditItem value={ context.address?.streetNumber as string } name={ "streetNumber" } property={"address"}/> :<DetailItem title={ context.address?.streetNumber as string } category={ "nummer" }/>}
                { edit ? <EditItem value={ context.address?.zipCode as string } name={ "zipCode" } property={"address"}/> :<DetailItem title={ context.address?.zipCode as string } category={ "plz" }/>}
                { edit ? <EditItem value={ context.address?.city as string } name={ "city" } property={"address"}/> :<DetailItem title={ context.address?.city as string } category={ "stadt" }/>}
                { edit ? <EditItem value={ context.address?.country as string } name={ "country" } property={"address"}/> :<DetailItem title={ context.address?.country as string } category={ "land" }/>}
            </div>
        </div>



    </div>
}

export default ContactDetails