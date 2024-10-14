type ButtonType ={

    title?: "registrieren" |"speichern" | "anrufen";
    type?: "submit" | "button";
}

const Button=({title ="registrieren",type = "submit"}:ButtonType)=>{

    return <button className={"globalButton"}type={type}>{title?.toUpperCase()}</button>
}

export default Button;