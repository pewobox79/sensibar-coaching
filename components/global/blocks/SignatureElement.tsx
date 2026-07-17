import styles from "@/styles/QuoteSection.module.css";

const SignatureElement = ({name = "Yessica Wolf", color, size="large"}:{name?: string, color?: string, size?: "small" | "large"}) => (

    <h3 style={{textAlign: "center", color: `${color ? color: ""}`}} className={`${size === "large" ? styles.signature_large : styles.signature_small}`}>{name}</h3>

)
export default SignatureElement