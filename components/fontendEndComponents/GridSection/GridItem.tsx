import RichTextRenderer from "@/components/strapi/RenderContentHelper";
import {GridItemTypes, TextBlock} from "@/types/generalTypes";
import styles from '@/styles/GridSection.module.css'
import {createImgUrl} from "@/utils/helper/imgHelper";

const GridItem =({data}:{data: GridItemTypes})=>{
    console.log("griditem", data.image?.url)
    return <a href={data?.link?.href} className={styles.gridItemWrapper}>
            <img className={styles.gridItemImg} alt={"coaching hochsensible"} src={createImgUrl(data?.image?.url)} width={100} height={100}/>
        <div className={styles.gridItemContent}>
            <RichTextRenderer blocks={data.description as TextBlock}/>
        </div></a>
}

export default GridItem