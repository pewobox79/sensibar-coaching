'use client'

import Button from "@/components/global/Button";

import {ContactData} from "@/components/dashboardComponents/WorkshopsOverview/components/WorkshopContactOverview";


const TransformationForm =({data}:{data:ContactData})=>{
    //const token = useLocalStorage("sensiUser")?.value

    function handleTransformationToClient(){

        //updateContact({isPatient:true}, data.documentId, token)
    }

    return <div>
        {data?.personalData && <h2>{data?.personalData?.firstname} {data?.personalData.lastname}  zu einem Coachee umwandeln?</h2>}

        <Button type={"submit"} action={handleTransformationToClient}/>
    </div>
}

export default TransformationForm