import Link from "next/link";

type ButtonType = {

    title?: "registrieren" | "speichern" | "anrufen" | "details"|"akzeptieren" | "schließen";
    type: "submit" | "button";
    action?:()=>void;
    href?: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
}

const Button = ({title = "registrieren", type = "submit", href, target = "_self", action}: ButtonType) => {

    return <>{ type === "button" ? <Link className={ "globalButton" } type={ type } href={ `${ href }` }
                                         target={ target }>{ title?.toUpperCase() }</Link> : <button className={"globalButton"} type={type} onClick={action}>{ title?.toUpperCase() }</button> }</>
}

export default Button;