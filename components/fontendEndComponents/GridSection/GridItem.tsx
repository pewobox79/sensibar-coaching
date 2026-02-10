import RichTextRenderer from "@/components/strapi/RenderContentHelper";
import {GridItemTypes, TextBlock} from "@/types/generalTypes";
import styles from '@/styles/GridSection.module.css'
import {createImgUrl} from "@/utils/helper/imgHelper";

const GridItem =({data}:{data: GridItemTypes})=>{

    const borderStyle ={
        full: styles.fullBorder,
        top: styles.borderTop,
        left: styles.borderLeft,
        right: styles.borderRight,
        bottom: styles.borderBottom,
        leftTop: styles.borderLeftTop,
        bottomRight: styles.borderRightBottom
    }

    const borderColor={
        darkGrey:styles.darkGrey,
        lightBeige:styles.lightBeige,
        beige:styles.beige,
        white:styles.white


    }

    const elementStyle = `${styles.gridItemWrapper} ${borderStyle[data?.border?.position as GridItemTypes["border"]["position"]]} ${borderColor[data?.border?.color?.color]} `
    return <a href={data?.link?.href} className={elementStyle}>
        {data.hasIcon && <img className={styles.gridItemImg} alt={data?.image?.alternativeText || "coaching hochsensible"} src={createImgUrl(data?.image?.url)} width={100} height={100}/>}
        <div className={styles.gridItemContent}>
            <RichTextRenderer blocks={data.description as TextBlock}/>
        </div></a>
}

export default GridItem