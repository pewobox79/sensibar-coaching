'use client'

import AdminPage from "@/pages/AdminPage";
import {useClientStore} from "@/stores/useClientStore";

const Admin =()=>{
const clientStore = useClientStore()
    const clientData = clientStore?.clientData
    return <div>
        <h1>Admin page</h1>
        <AdminPage/>
        <p>Firstname: {clientData?.personalData.firstname}</p>
        <p>Lastname: {clientData?.personalData.lastname}</p>
        <p>Email: {clientData?.contact.email}</p>
        {/* add more fields if needed */}
    </div>
}

export default Admin