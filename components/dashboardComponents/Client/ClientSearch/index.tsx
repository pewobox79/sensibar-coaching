'use client'

import {Typeahead} from 'react-bootstrap-typeahead';
import Button from "@/components/global/Button";
import styles from '@/styles/Client.module.css'
import '@/styles/typeahead.css'
import {useModalOpen} from "@/stores/useModalOpen";
import {useClientStore} from "@/stores/useClientStore";
import {useEffect, useState} from "react";
import {convertStringToFirstAndLastName, getClientsArray, getSelectedClientFromAPI} from "@/lib/strapi/generalHelper";
import {useRouter} from 'next/navigation'
import ToastMessage from "@/components/global/ToastMessage";


export type Option = string | Record<string, unknown>;
const ClientSearch = () => {
    const router = useRouter()
    const closeSearch = useModalOpen().setSearchClose;
    const [error, setError] = useState({msg: "Bitte Kunden auswählen", state: false, type: "error"})
    const [selection, setSelection] = useState<Option[]>([""])
    const [client, setClient] = useState<Option[]>([]);

    function provideClientDataToStore() {

        if(client.length === 0){

           setError({...error, state: true})


        }else {


            const {firstName, lastName} = convertStringToFirstAndLastName(client[0] as string)


            getSelectedClientFromAPI(firstName, lastName).then(data => {
                const updatedClientState = {...data, selectedClientDetails: {type: "", details: "", title: ""}} //removes old selection details state
                useClientStore.getState().setClientData(updatedClientState)
            })

            router.push("/admin/client")
            closeSearch()
        }
    }

    useEffect(() => {

        getClientsArray("patient").then(data => setSelection(data))

    }, [])

    const handleClientChange = (selected: Option[]) => {
        // Directly set the selected items as strings
        setClient(selected);
    };
    return <div className={ styles.searchWrapper }>
        <div className={ styles.searchInner }>


            <form>

                <div className={ styles.searchItem }>
                    <Typeahead
                        id="search"
                        placeholder="Kunde suchen"
                        options={selection? selection :[]}  // Ensure `selection` is typed as the correct array type
                        onChange={ handleClientChange }  // Ensure `handleClientChange` is properly typed
                        clearButton={true}
                    />
                    {error.state && <ToastMessage state={ error } setState={setError}/>}
                </div>
            </form>
            <div className={"buttonsSection"}>
            <Button type={ "submit" } title={"öffnen"} action={ provideClientDataToStore } style={{margin: "10px"}}/>
            <Button type={ "submit" } title={ "schließen" } action={ closeSearch }/>
            </div>


        </div>

    </div>
}

export default ClientSearch;