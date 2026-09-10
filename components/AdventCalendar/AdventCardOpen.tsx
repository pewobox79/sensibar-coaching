import Button from "@/components/global/Button";

const AdventCardOpen =({day, handleModal}:{day:number, handleModal: () => void}) => {

  return (
        <div>
            <span className="dayNumberOnOpen">{ day }</span>
            <Button type={"submit"}  title={"Türchen öffnen"} action={handleModal}/>
        </div>
  )
}

export default AdventCardOpen