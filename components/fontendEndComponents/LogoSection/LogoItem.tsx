import Image from "next/image";
import {getBestAvailableImgResolution} from "@/utils/helper/imgHelper";
import {LogoType} from "@/types/generalTypes";
import styles from '@/styles/LogoSection.module.css'

const LogoItem = (props: LogoType) => {

    if(!props) return
    const {src, hasLink, target, alt, href } = props

    const img = getBestAvailableImgResolution(src)
    return <a href={hasLink ? href: "#"} target={target} title={alt} className={styles.logoElement}>
            <Image src={img?.url || ""} alt={ img?.alt || "" } width={ 150 } height={ 150 }/></a>
}

export default LogoItem