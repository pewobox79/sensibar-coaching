import {getColor} from "@/utils/helper/colorHelper";
import Image from "next/image";
import Stern from "../../../assets/images/stern/stern_transparent_v2.png";
import Container from "@/components/global/Container";
import LogoItem from "@/components/fontendEndComponents/LogoSection/LogoItem";
import {BgColorType, LogoSectionType, LogoType} from "@/types/generalTypes";
import SternElement from "@/components/global/SternElement";

const LogoSection = ({data}:{data: LogoSectionType}) => {
    const colorSet = getColor(data?.bgColor?.color as string)
    const {title, logos} = data
    return <Container id={ "partner" } backgroundColor={ colorSet.bgColor || "white" }>
        <div className={"innerWrapper"}><div className='referenceHeading'><h2 style={{color: colorSet.color}}>{ title || '' }</h2>
           <SternElement bgColor={colorSet.bgColor}/>
        </div>
            <div style={{padding: "20px 30px"}}>
                {logos.map((logo:LogoType)=>{
                    console.log("logo", logo)
                    return <LogoItem key={logo.src.documentId} {...logo}/>
                })}
            </div></div>
    </Container>

}

export default LogoSection