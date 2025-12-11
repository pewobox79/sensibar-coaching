import RichTextRenderer from "@/components/strapi/RenderContentHelper";
import {GridItemTypes, TextBlock} from "@/types/generalTypes";
import styles from '@/styles/GridSection.module.css'
import {getPlaceholderImg} from "@/utils/placeholderImg";

const GridItem =({data}:{data: GridItemTypes})=>{
    console.log("griditem", data)
    return <div className={styles.gridItemWrapper}>
            <img className={styles.gridItemImg} src={getPlaceholderImg(150,150)} width={150} height={150}/>
        <div className={styles.gridItemContent}>
            <RichTextRenderer blocks={data.description as TextBlock}/>
        </div>
    </div>
}

export default GridItem