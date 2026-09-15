import Button from "@/components/global/Button";

const AdventCardOpen =({day, handleModal}:{day:number, handleModal: () => void}) => {

  return (
        <div>
            <span className="dayNumberOnOpen">{ day }</span>
            <div className={"globalButton"} title={"Türchen öffnen"} onClick={handleModal}>Türchen öffnen</div>
        </div>
  )
}

export default AdventCardOpen