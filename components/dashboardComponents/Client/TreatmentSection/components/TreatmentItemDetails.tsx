'use client'

import styles from "@/styles/Client.module.css";
import {useClientStore} from "@/stores/useClientStore";

const TreatmentItemDetails = () => {

    const clientContext = useClientStore()

    return <div className={ styles.treatmentSplitRight }>
        <div className={styles.detailsTypeInfoBlock}>
        { clientContext.clientData?.selectedClientDetails?.title && <h3>Art des Termins:</h3> }
        <p>{ clientContext.clientData?.selectedClientDetails?.type }</p>
    </div>
        { clientContext.clientData?.selectedClientDetails?.title && <h3>Details</h3> }
        <div style={{wordBreak: "break-word"}}>{ clientContext.clientData?.selectedClientDetails?.details }</div>

    </div>
}

export default TreatmentItemDetails