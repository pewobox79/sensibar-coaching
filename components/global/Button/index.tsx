'use client'
import Link from "next/link";
import React from "react";

type ButtonType = {

    title?: "registrieren" | "speichern" | "anrufen" | "details"|"akzeptieren" | "schließen" | "login" |"neu" | "Kunde suchen" |"öffnen" |"absagen" |"einladen" |"neuer workshop" |"neuer Coachee";
    type: "submit" | "button";
    action?:()=>void;
    href?: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
    style?: React.CSSProperties,
    process?: boolean
}

const Button = ({title = "registrieren", type = "submit", href, target = "_self", action, style}: ButtonType) => {



    return <>{ type === "button" ? <Link style={style} className={ "globalButton" } type={ type } href={ `${ href }` }
                                         target={ target }>{ title?.toUpperCase() }</Link> : <button style={style} className={'globalButton'} type={type} onClick={action}>{ title?.toUpperCase() }</button> }</>
}

export default Button;