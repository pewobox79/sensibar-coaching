import Container from "@/components/global/Container";
import styles from '@/styles/BackgroundImgWithText.module.css'
import RichTextRenderer from "@/components/strapi/RenderContentHelper";
import {JumbotronType, TextBlock} from "@/types/generalTypes";
import BackgroundImage from "@/components/global/BackgroundImage";


const BackgroundImgWithText=({data}:{data: JumbotronType})=>{
    return <Container id='jumbotron'>
        <div className={styles.backgroundImgWithTextInner}>
            <BackgroundImage imageUrl={data?.Image?.url as string}/>
            <div className={styles.textBlock}>
                <RichTextRenderer blocks={data.text as TextBlock} textColor={'white'}/>
            </div>

        </div>

    </Container>
}

export default BackgroundImgWithText;