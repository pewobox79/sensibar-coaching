import Container from "@/components/global/Container";
import styles from '@/styles/GridSection.module.css'
import GridItem from "@/components/fontendEndComponents/GridSection/GridItem";
import {getColor} from "@/utils/helper/colorHelper";
import{ GridBundleType } from "@/types/generalTypes";

const GridSectionBundle =({data}:{data:GridBundleType})=>{
console.log("bundle data", data)
    const colorSet=getColor(data?.bgColor?.color)
    return<Container id={data.hashId} backgroundColor={colorSet?.bgColor}>
        <div>
            <h2 className={styles.heading} style={{color: colorSet.color}}>{data?.title || ''}</h2>
        </div>
        <div className={styles.gridInner}>
            {data.item.map((item)=>(
                <GridItem key={item.id} data={item}/>
            ))}
        </div>
    </Container>
}

export default GridSectionBundle