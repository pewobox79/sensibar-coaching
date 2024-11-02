'use client'

import React from "react";
const DashboardLayout =({children}:{children: React.ReactNode | React.ReactElement | React.ReactElement[]})=>{

    return <div>

        <h1>dashboard</h1>
        {children}
    </div>
}

export default DashboardLayout;