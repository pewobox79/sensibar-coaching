import RichTextRenderer from "@/components/strapi/RenderContentHelper";
import {GridItemTypes, TextBlock} from "@/types/generalTypes";
import styles from '@/styles/GridSection.module.css'
import {getPlaceholderImg} from "@/utils/placeholderImg";

const GridItem =({data}:{data: GridItemTypes})=>{
    return <a href={data?.link?.href} className={styles.gridItemWrapper}>
            <img className={styles.gridItemImg} alt={"coaching hochsensible"} src={getPlaceholderImg(150,150)} width={150} height={150}/>
        <div className={styles.gridItemContent}>
            <RichTextRenderer blocks={data.description as TextBlock}/>
        </div></a>
}

export default GridItem