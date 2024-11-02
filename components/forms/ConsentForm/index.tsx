'use client'
import {Form} from "react-bootstrap";

const ConsentForm =({action, values}:{action: ()=>void , values: {necessary: boolean, tracking: boolean, marketing: boolean}})=>{



    return <form>

        <Form.Check // prettier-ignore
            type={ "checkbox" }
            disabled={true}
            id={ `necessary` }
            label={ "Essentielle Cookies " }
            checked={ values.necessary }
            onChange={ action }
            name={ "necessary" }
        />

        <Form.Check // prettier-ignore
            type={ "checkbox" }
            id={ `marketing` }
            label={ "Marketing Cookies" }
            checked={ values.marketing }
            onChange={ action }
            name={ "marketing" }
        />

        <Form.Check // prettier-ignore
            type={ "checkbox" }
            id={ `tracking` }
            label={ "Analyse und Verlauf Cookies" }
            checked={ values.tracking }
            onChange={ action }
            name={ "tracking" }
        />

    </form>
}

export default ConsentForm;