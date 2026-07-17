import PolaroidElement from "@/components/global/PolaroidElement/PolaroidElement";
import {SpeakerType} from "@/types/generalTypes";

const SpeakerSection =({speaker}:{speaker:SpeakerType[]})=>{
    if(!speaker) return

    const SpeakerElements = speaker.map((item:SpeakerType) => <PolaroidElement key={item.name + item.id} name={item.name} size="small" ><img src={item.image?.formats?.thumbnail?.url} alt={item.name}/></PolaroidElement>)

    return <section style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: 20}}>
        <h3>Referenten</h3>
        <div style={{display: "flex", gap: "1rem", alignItems: "center",   margin: "2.5rem 0"}}>
            {SpeakerElements }
        </div>
    </section>
}

export default SpeakerSection