'use client'
import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
const AdminLayout = ({children}:{children: React.ReactNode | React.ReactElement |React.ReactElement[]})=>{

    return <div>
    <DashboardLayout>
        {children}
    </DashboardLayout>
    </div>
}

export default AdminLayout;