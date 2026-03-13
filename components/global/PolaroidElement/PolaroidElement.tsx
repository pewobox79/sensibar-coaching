import {ReactElement} from "react";
import styles from "@/styles/PolariodElement.module.css";
import SignatureElement from "@/components/global/blocks/SignatureElement";

const PolaroidElement = ({children, backgroundColor}:{ children: ReactElement, backgroundColor?: string}) => {


    return <div className={styles.polaroidElement} style={{backgroundColor}}>

        <div className={styles.polaroidElementInner}>
            { children }
        </div>
        <div className={styles.polaroidElementSignature}>
            <SignatureElement />
        </div>


    </div>
}
export default PolaroidElement