'use client'

import {useState} from "react";
import {Option} from "@/components/dashboardComponents/Client/ClientSearch";
import styles from "@/styles/Client.module.css";
import {Typeahead} from "react-bootstrap-typeahead";
import {convertStringToFirstAndLastName, getSelectedClientFromAPI} from "@/lib/strapi/generalHelper";
import TransformationForm from "@/components/forms/TransformContactForm/TransformationForm";

const CreateContactForm = ({contacts}: { contacts: [] }) => {

    const [fromExisting, setFromExisting] = useState("true");
    const [client, setClient] = useState();

    function handleClientChange(selected: Option[]){

        if(selected[0]){

            const {firstName, lastName} = convertStringToFirstAndLastName(selected[0] as string)

            getSelectedClientFromAPI(firstName, lastName).then(data => {
                setClient(data)
            })
        }else{
            return
        }

    }

    function handleSource(e:{target:{value: string}}){
        setFromExisting(e.target.value)
    }


    return <div style={{display: "flex", flexDirection: "column", width: "100%", alignItems: "center", justifyContent: "center"}}>
        <div className={ styles.searchItem }>
            <select title={ "Source" } value={fromExisting} onChange={ handleSource }>
                <option value="false">Neu</option>
                <option value="true">Vorhandener Kunde</option>
            </select>
        </div>

        { fromExisting === "true" ? <form>

            <div className={ styles.searchItem }>
                <Typeahead
                    id="search"
                    placeholder="Kontakt Suchen"
                    defaultInputValue={""}
                    options={ contacts ? contacts : [] }  // Ensure `selection` is typed as the correct array type
                    onChange={ handleClientChange }  // Ensure `handleClientChange` is properly typed
                    clearButton={ true }
                />
            </div>
        </form> : <div>new contact form</div> }



        {client && <TransformationForm data={client}/>}</div>
}

export default CreateContactForm