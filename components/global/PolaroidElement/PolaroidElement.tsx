import {ReactElement} from "react";
import styles from "@/styles/PolariodElement.module.css";
import SignatureElement from "@/components/global/blocks/SignatureElement";

const PolaroidElement = ({children, backgroundColor, size="large", name, signature}:{signature: boolean, children: ReactElement, backgroundColor?: string, size?: "small" |"large", name?: string}) => {

    return <div className={`${size === "large" ? styles.polaroidElement_large : styles.polaroidElement_small}`} style={{backgroundColor}}>

        <div className={styles.polaroidElementInner}>
            { children }
        </div>
        <div className={styles.polaroidElementSignature}>
            {signature && <SignatureElement name={name} size={size}/>}
        </div>


    </div>
}
export default PolaroidElement