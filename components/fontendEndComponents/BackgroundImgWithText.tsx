import Container from "@/components/global/Container";
import styles from '@/styles/BackgroundImgWithText.module.css'
import RichTextRenderer from "@/components/strapi/RenderContentHelper";
import {JumbotronType, TextBlock} from "@/types/generalTypes";
import BackgroundImage from "@/components/global/BackgroundImage";
import {getColor} from "@/utils/helper/colorHelper";


const BackgroundImgWithText=({data}:{data: JumbotronType})=>{

    console.log("data", data)
    const colorSet = getColor(data?.bgColor?.color as string)
    return <Container id='jumbotron'>
        <div className={styles.backgroundImgWithTextInner}>
            <BackgroundImage imageUrl={data?.Image?.url as string}/>
            <div className={styles.textBlock}>
                <RichTextRenderer blocks={data.text as TextBlock} textColor={colorSet.color}/>
            </div>

        </div>

    </Container>
}

export default BackgroundImgWithText;