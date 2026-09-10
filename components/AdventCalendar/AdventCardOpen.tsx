import React, {useState} from "react";
import AdventCardModal from "@/components/AdventCalendar/AdventCardModal";

const AdventCardOpen =({day}:{day:number}) => {
    const [modal, setModal] = useState(false)

    function handleModal(){
        setModal(!modal)
    }
  return (
    <>
        <div>
            <span className="dayNumberOnOpen">{ day }</span>
            Inhalt des Adventskalenders
            <div onClick={handleModal}>click</div>
        </div>
        {modal && <AdventCardModal modal={modal} handleModal={handleModal} />}
    </>
  )
}

export default AdventCardOpen