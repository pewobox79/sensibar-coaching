import CreateContactForm from "@/components/forms/TransformContactForm";
import {getClientsArray} from "@/lib/strapi/generalHelper";
import {Suspense} from "react";

const CreateClientPage =async()=>{

    const contacts = await getClientsArray("all")

    return <Suspense fallback={"isLoading"}><CreateContactForm contacts={contacts}/></Suspense>

}

export default CreateClientPage