

import styles from '@/styles/Client.module.css'

const WsEditItem=({type, value, property = "", changeAction}:{type:string, value:string, property?:string, changeAction: (event:{target: {value: string, name: string}})=>void})=>{
    if(type === "select" && property === "ws_status"){
        return <><label className={styles.editItemLabel}>{property}</label><select value={value} className={styles.editItem} name={property} onChange={changeAction}>
            <option value={"planned"}>geplant</option>
            <option value={"cancelled"}>abgesagt</option>
            <option value={"confirmed"}>bestätigt</option>

        </select></>
    } else if(type === "select" && property === "type"){
        return <><label className={styles.editItemLabel}>{property}</label><select value={value} className={styles.editItem} name={property} onChange={changeAction}>
            <option value={"online"}>online</option>
            <option value={"inPerson"}>vor Ort</option>
            <option value={"hybrid"}>Hybrid</option>

        </select></>


    }

    return <div style={{padding: "4px 0"}}><label className={styles.editItemLabel}>{property}</label><input type={type} value={value} className={styles.editItem} name={property} onChange={changeAction}/></div>
}

export default WsEditItem;