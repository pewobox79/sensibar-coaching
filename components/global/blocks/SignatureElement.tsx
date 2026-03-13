import styles from "@/styles/QuoteSection.module.css";

const SignatureElement = ({name = "Yessica Wolf", color}:{name?: string, color?: string}) => (

    <h3 style={{textAlign: "center", color: `${color ? color: ""}`}} className={styles.signature}>{name}</h3>

)
export default SignatureElement