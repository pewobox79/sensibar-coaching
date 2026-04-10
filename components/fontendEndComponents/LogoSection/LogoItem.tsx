import Image from "next/image";
import {getBestAvailableImgResolution} from "@/utils/helper/imgHelper";
import {LogoType} from "@/types/generalTypes";

const LogoItem = (props: LogoType) => {

    if(!props) return
    const {src, hasLink, target, alt, href } = props

    const img = getBestAvailableImgResolution(src)
    return <a href={hasLink ? href: "#"} target={target} title={alt}>
            <Image src={img?.url || ""} alt={ img?.alt || "" } width={ 150 } height={ 150 }/></a>
}

export default LogoItem