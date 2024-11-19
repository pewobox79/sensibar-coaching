import Button from "@/components/global/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const WorkshopCancelWindow = ({title, date, action, close}:{title:string, date:string, action:()=>void, close:()=>void}) => {


    return <div className={ "globalModal" } >
        <div className={ "globalModalInner" }>
            <div className={ "modalCloseButton" } onClick={ close }><FontAwesomeIcon icon={ faClose }/></div>
            <div className={ "globalModalBody" }><h3>Willst du den Workshop <br/>{ title.toUpperCase() } am {date} <br/> wirklich
        absagen?</h3>
        <div style={ {display: "flex", flexDirection: "row", margin: "20px "} }><Button type={ "submit" }
                                                                                        title={ "absagen" }
                                                                                        action={ action }/><Button
            type={ "submit" } title={ "schließen" } action={ close }/></div>
    </div>
        </div></div>
}

export default WorkshopCancelWindow;