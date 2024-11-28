import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from "react";

const AuthLayout =async ({children}:{children: React.ReactNode | React.ReactElement |React.ReactElement[]})=>{

    const cookieStore = cookies()
    const token:{name: string, value: string} |undefined = cookieStore.get('sensiToken')
    console.log("token", token)

    if(!token?.value){
        redirect("/login")
    }

    return <>{children}</>
}

export default AuthLayout