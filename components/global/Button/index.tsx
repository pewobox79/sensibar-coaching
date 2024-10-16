type ButtonType ={

    title?: "registrieren" |"speichern" | "anrufen" | "details";
    type?: "submit" | "button";
    processing?: boolean;
}

const Button=({title ="registrieren",type = "submit", processing}:ButtonType)=>{

    return <button className={"globalButton"} type={type} disabled={processing}>{title?.toUpperCase()}</button>
}

export default Button;