import Container from "@/components/global/Container";
import styles from '@/styles/BackgroundImgWithText.module.css'
import RichTextRenderer from "@/components/strapi/RenderContentHelper";
import {createImgUrl} from "@/utils/helper/imgHelper";
import {JumbotronType, TextBlock} from "@/types/generalTypes";


const BackgroundImgWithText=({data}:{data: JumbotronType})=>{
    const imgUrl = createImgUrl(data?.Image?.url)
    const backgroundStyle={
        backgroundColor:'#fff',
        backgroundImage: `url(${imgUrl})`,
        backgroundSize:'cover',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        height: '100%',
        width: '100%',
    }
    return <Container id={"kdjf"}>
        <div className={styles.backgroundImgWithTextInner}>

            <div style={backgroundStyle}></div>
            <div className={styles.textBlock}>
                <RichTextRenderer blocks={data.text as TextBlock}/>
            </div>

        </div>

    </Container>
}

export default BackgroundImgWithText;