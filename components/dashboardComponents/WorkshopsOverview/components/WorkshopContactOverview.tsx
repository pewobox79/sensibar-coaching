'use client'

import WorkshopContactDataTable
    from "@/components/dashboardComponents/WorkshopsOverview/components/WorkshopContactDataTable";
import {getWorkshopContacts} from "@/lib/strapi/workshopHelper";
import {useEffect, useState} from "react";
import Button from "@/components/global/Button";
import Loader from "@/components/global/Loader";

 export type ContactData = {
     documentId?: string;
    personalData: {
        firstname: string;
        lastname: string;
        gender: string;
        birthdate: string;
    };
    isPatient: boolean;
    condition_status?: {
        sensitiveStatus: string;
    };
};
const WorkshopContactOverview = ({contacts=[], action}: { contacts: [], action: () => void }) => {

    const [listOfContacts, setListOfContacts] = useState<ContactData[]>([{documentId: "",personalData: {firstname: "",lastname: "", gender: "", birthdate: ""},isPatient: false, condition_status: {sensitiveStatus: ""}}])
    const [status, setStatus] =useState<"loading" | "done" |"error">("loading")
    useEffect(() => {

        const listOfData:{personalData: {firstname: string,lastname: string, gender: string, birthdate: string}, isPatient: false, condition_status?: {
                sensitiveStatus:string
            }}[] = []
        contacts.forEach((contact: { documentId: string }) => {
            getWorkshopContacts(contact.documentId).then((data) => {

                listOfData.push({...data})
                setListOfContacts(listOfData)


            })

        })

        setTimeout(()=>{

            setStatus("done")
        }, 1500)

    }, [contacts])


    console.log("list state", listOfContacts)


    return <div className={ "globalModal" }>

        <div className={ "globalModalInner" }>


            <div className={ "globalModalBody" } style={ {height: "auto"} }>
                <div style={ {height: "80px", backgroundColor: "white", width: "100%", marginTop: "20px"} }>
                    <Button type={"submit"} action={action} title={"schließen"}/>

                </div>
                { status === "loading" ?<Loader/>: <WorkshopContactDataTable contacts={ listOfContacts }/> }
            </div>
        </div>

    </div>
}

export default WorkshopContactOverview