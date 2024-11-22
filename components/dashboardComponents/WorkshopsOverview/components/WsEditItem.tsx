

import styles from '@/styles/Client.module.css'

const WsEditItem=({type, value, property = ""}:{type:string, value:string, property?:string})=>{
    if(type === "select" && property === "ws_status"){
        return <select value={value} className={styles.editItem} >
            <option value={"planned"}>geplant</option>
            <option value={"cancelled"}>abgesagt</option>
            <option value={"confirmed"}>bestätigt</option>

        </select>
    } else if(type === "select" && property === "location"){
        return <select value={value} className={styles.editItem} >
            <option value={"online"}>online</option>
            <option value={"inPerson"}>vor Ort</option>
            <option value={"hybrid"}>Hybrid</option>

        </select>


    }

    return <input type={type} value={value} className={styles.editItem}/>
}

export default WsEditItem;