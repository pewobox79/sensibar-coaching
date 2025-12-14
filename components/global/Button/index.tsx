'use client'
import Link from "next/link";
import React from "react";

type ButtonType = {
    title?: string
    type: "submit" | "button";
    action?: () => void;
    href?: string;
    target?: "_blank" | "_self" | "_parent" | "_top" | "internal" | "external";
    style?: React.CSSProperties,
    process?: boolean
}

const Button = ({title = "registrieren", type = "submit", href, target = "_self", action, style}: ButtonType) => {

    function LinkTarget(targetValue: string) {
        switch (targetValue) {
            case 'internal':
                return '_self'
            case 'external':
                return '_blank'
            default :
                return targetValue
        }
    }

    return <>{ type === "button" ?
        <Link style={ style } className={ "globalButton" } type={ type } href={ href || '' }
              target={ LinkTarget(target) }>{ title?.toUpperCase() }</Link> :
        <button style={ style } className={ 'globalButton' } type={ type }
                onClick={ action }>{ title?.toUpperCase() }</button> }</>
}

export default Button;