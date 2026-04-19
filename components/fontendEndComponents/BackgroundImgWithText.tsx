import Container from "@/components/global/Container";
import styles from '@/styles/BackgroundImgWithText.module.css'
import RichTextRenderer from "@/components/strapi/RenderContentHelper";
import {ImageType, JumbotronType, TextBlock} from "@/types/generalTypes";
import BackgroundImage from "@/components/global/BackgroundImage";


const BackgroundImgWithText=({data}:{data: JumbotronType})=>{

    const {Image, text, textBoxLeft} = data

    const textBlockStyling = textBoxLeft ? styles.textBlockLeft: styles.textBlockRight
    return <Container id='jumbotron'>
        <div className={styles.backgroundImgWithTextInner}>
            <BackgroundImage image={Image as ImageType}/>
            <div className={textBlockStyling}>
                <RichTextRenderer blocks={text as TextBlock} textColor={'white'}/>
            </div>

        </div>

    </Container>
}

export default BackgroundImgWithText;