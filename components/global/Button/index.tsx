import Link from "next/link";

type ButtonType ={

    title?: "registrieren" |"speichern" | "anrufen" | "details";
    type?: "submit" | "button";
    href?: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
}

const Button=({title ="registrieren",type = "submit", href, target="_self"}:ButtonType)=>{

    return <Link className={"globalButton"} type={type} href={`${href}`} target={target}>{title?.toUpperCase()}</Link>
}

export default Button;