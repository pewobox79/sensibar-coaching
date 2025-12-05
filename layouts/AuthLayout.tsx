import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from "react";

const AuthLayout =async ({children}:{children: React.ReactNode | React.ReactElement |React.ReactElement[]})=>{

    const cookieStore = await cookies()
    const token:{name: string, value: string} |undefined = cookieStore.get('sensiToken')

    if(!token?.value){
        redirect("/login")
    }

    return <>{children}</>
}

export default AuthLayout