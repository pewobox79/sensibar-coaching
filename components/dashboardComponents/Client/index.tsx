'use client'

import ContactDetails from "@/components/dashboardComponents/Client/ContactDetails";
import {useClientStore} from "@/stores/useClientStore";
import TreatmentSection from "@/components/dashboardComponents/Client/TreatmentSection";
import styles from '@/styles/Client.module.css'
import Button from "@/components/global/Button";
import {ClientData} from "@/stores/useClientStore";
import {useModalOpen} from "@/stores/useModalOpen";


const Client = () => {

    const clientContext = useClientStore();

    const openClientModal = useModalOpen().setSearchOpen;
    return <div className={ styles.clientPageWrapper }>
        { clientContext.clientData.personalData.firstname.length > 0 ? <><ContactDetails
            context={ clientContext?.clientData as ClientData }/>
            <TreatmentSection/></> : <div style={ {
            width: "100%",
            minHeight: "50dvh",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        } }><Button type={ "submit" } action={ openClientModal } title={ "Kunde suchen" }/>
        </div> }
    </div>
}

export default Client