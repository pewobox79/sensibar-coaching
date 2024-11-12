'use client'
import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import {useModalOpen} from "@/stores/useModalOpen";


const GlobalModal = ({children}: { children: React.ReactElement[] | React.ReactElement }) => {
    const modalClose = useModalOpen.getState().setCreateModalClose

    return (
        <div className={ "globalModal" } onClick={modalClose}>
            <div className={ "globalModalInner" }>
                <div className={ "modalCloseButton" } onClick={ modalClose }><FontAwesomeIcon icon={ faClose }/></div>
                <div className={ "globalModalBody" }>
                    { children }
                </div>
            </div>
        </div>
    )
}

export default GlobalModal