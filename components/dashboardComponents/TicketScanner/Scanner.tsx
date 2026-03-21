'use client'
import Button from "@/components/global/Button";
import styles from "@/styles/DashboardLayout.module.css";

const Scanner = () => {

    function handleTicketValidation(){
        console.log("Ticket validiert")
    }

    return <div className={"innerWrapper"}>

        <div className={styles.scannerInner}>
            <h1>Ticket entwerten:</h1>

            <div>
                <h4>Besucher</h4>
                <h2>PETER WOLF</h2>
            </div>

           <div className={styles.scannerInnerItem}>
               <h4>Workshop Nummer:</h4>
               <h2>23434232</h2>
           </div>
            <div className={styles.scannerInnerItem}>
                <h4>Ticket Nummer:</h4>
                <h2>2423423523</h2>
            </div>

            <Button type={"submit"} title={"Entwerten"} action={handleTicketValidation} style={{margin: "10px"}}/>
        </div>

    </div>
}

export default Scanner