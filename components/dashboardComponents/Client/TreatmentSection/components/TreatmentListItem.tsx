import styles from '@/styles/Client.module.css'
import {useClientStore} from "@/stores/useClientStore";

const TreatmentListItem =(props:{title:string, createdAt:string, type: string, details: string})=>{


    const clientContext = useClientStore()
    const date = new Date(props.createdAt)
    const newDate = `${date.getUTCDate()}.${date.getMonth()+1}.${date.getFullYear() } `

    const handleClick = ()=>{
        clientContext.setClientData({selectedClientDetails: {type: props.type, title: props.title, details: props.details}})
    }

    const customItemStyle = `${styles.treatmentItemElement} ${clientContext.clientData.selectedClientDetails.title === props.title ? styles.activeListItem: ""} `
    return <div className={customItemStyle} onClick={handleClick}>
        <div style={{marginRight: 15}}>{newDate}</div> <div>{props.title}</div>

    </div>
}

export default TreatmentListItem