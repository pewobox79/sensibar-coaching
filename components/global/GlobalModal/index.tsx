'use client'
import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import {useModalOpen} from "@/stores/useModalOpen";


const GlobalModal = ({children, type}: { children: React.ReactElement[] | React.ReactElement|React.ReactNode , type: "create" |"contacts" |"absage"}) => {
    let modalAction

    switch (type) {
        case "create":
            modalAction = useModalOpen.getState().setCreateModalClose;
            break;
        case "contacts":
            modalAction = useModalOpen.getState().setContactsTableClose;
            break;
        case "absage":
            modalAction = useModalOpen.getState().setCancelWorkshopModalClose;
            break;
        default:
            throw new Error("Invalid modal type");
    }

    return (
        <div className={ "globalModal" } >
            <div className={ "globalModalInner" }>
                <div className={ "modalCloseButton" } onClick={ modalAction }><FontAwesomeIcon icon={ faClose }/></div>
                <div className={ "globalModalBody" }>
                    { children }
                </div>
            </div>
        </div>
    )
}

export default GlobalModal