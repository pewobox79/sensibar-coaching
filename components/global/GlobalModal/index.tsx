'use client'
import React from 'react'


const GlobalModal =({children}: {children: React.ReactElement[]| React.ReactElement})=>{

    return (
        <div className={"globalModal"}>
            <div className={"globalModalInner"}>
                <div className={"globalModalBody"}>
            { children }
                </div>
            </div>
        </div>
    )
}

export default GlobalModal