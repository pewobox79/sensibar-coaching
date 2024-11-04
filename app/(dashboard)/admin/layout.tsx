import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
import '@/styles/globals.css'

const AdminLayout = ({children}: { children: React.ReactNode | React.ReactElement | React.ReactElement[] }) => {

    return <html>
    <body>
    <DashboardLayout>
        { children }
    </DashboardLayout>
    </body>
    </html>
}

export default AdminLayout;