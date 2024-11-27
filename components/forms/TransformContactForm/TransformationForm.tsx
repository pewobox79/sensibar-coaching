'use client'

import Button from "@/components/global/Button";

import {ContactData} from "@/components/dashboardComponents/WorkshopsOverview/components/WorkshopContactOverview";
import {
    getSelectedClientFromAPI,
    transformContactToCoachee,
} from "@/lib/strapi/generalHelper";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useClientStore} from "@/stores/useClientStore";


const TransformationForm = ({data}: { data: ContactData }) => {

    console.log("data", data)
    const router = useRouter()

    const [success, setSuccess] = useState({state: false, msg: "Neuer Coachee hinzugefügt", type: "success"})
    const token = useLocalStorage("sensiUser")?.value

    async function handleTransformationToClient() {

        try {

            const response = await transformContactToCoachee(token.jwt, data?.documentId as string);

            if (response.msg === "new coachee added") {

                setSuccess({...success, state: true})
                getSelectedClientFromAPI(data.personalData.firstname, data.personalData.lastname).then(data => {
                    const updatedClientState = {...data, selectedClientDetails: {type: "", details: "", title: ""}} //removes old selection details state
                    useClientStore.getState().setClientData(updatedClientState)
                })

                setTimeout(() => {

                    router.push("/admin/client")
                }, 1000)
            }
        } catch (e) {

            console.error("Error transforming contact to client", e)
        }
    }

    return <>
        <div style={ {textAlign: "center"} }>
            { data?.personalData && <h2><span style={ {
                fontSize: "1.5rem",
                fontWeight: "bold"
            } }>{ data?.personalData?.firstname } { data?.personalData.lastname }</span> zu einem Coachee umwandeln?
            </h2> }

            <div style={ {marginTop: "20px"} }>
                <Button type={ "submit" } title={ "neuer Coachee" }
                                                       action={ handleTransformationToClient }/></div>

            <div style={ {padding: "40px 0"} }>
                {success.state && <div style={{ backgroundColor: "green"}}><h2>Kontakt ist nun ein Coachee</h2></div>}
            </div>
        </div>

    </>
}

export default TransformationForm