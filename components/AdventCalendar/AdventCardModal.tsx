import RenderContentHelper from "@/components/strapi/RenderContentHelper";
import {AdventCardTypes, TextBlock} from "@/types/generalTypes";
import Button from "@/components/global/Button";

const AdventCardModal = ({day, modal, handleModal, content}:{day: number, modal: boolean, handleModal: () => void, content: AdventCardTypes["content"]}) => {

    if(!content) return <div className={`adventCardModal ${modal ? "adventCardModalOpen" : ""}`}>
        <Button title={"Schließen"} type={"submit"} action={handleModal}/>
        <h1 style={{color: "black"}}>Bitte in Strapi einen inhalt für Tag {day} einfügen</h1>
        </div>

    return <div className={`adventCardModal ${modal ? "adventCardModalOpen" : ""}`}>

        <Button title={"Schließen"} type={"submit"} action={handleModal}/>
        <>
            {content.isText ? <RenderContentHelper blocks={content.content as TextBlock || [] as TextBlock}/> : <iframe width="auto" height="auto" src="https://www.youtube.com/embed/coHjNndUh04?si=MTKca_Bbjh1cpXX5"
                                                                                        title="YouTube video player"
                                                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                                                        referrerPolicy="strict-origin-when-cross-origin"
                                                                                        allowFullScreen></iframe>}
        </>

    </div>
}

export default AdventCardModal