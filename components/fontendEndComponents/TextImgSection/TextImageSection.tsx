import styles from '@/styles/TextImageSection.module.css'
import Container from "@/components/global/Container";
import Button from "@/components/global/Button";
import RenderContentHelper from "@/components/strapi/RenderContentHelper";
import {createImgUrl} from "@/utils/helper/imgHelper";
import {TextBlockType, TextImageSectionType} from "@/types/generalTypes";

const TextImgSection = ({isTextLeft = false, backgroundColor, sectionId, body, image}:{body: TextImageSectionType["text"], button?: TextImageSectionType["link"], image: TextImageSectionType["image"],isTextLeft: boolean, backgroundColor?:string, sectionId: string}) => {
    const imgUrl = createImgUrl(image?.url)
    const customStyle = isTextLeft ? styles.textImgSectionInnerLeftToRight: styles.textImgSectionInnerRightToRight
    return <Container backgroundColor={backgroundColor} id={sectionId}>
        <div className={customStyle}>
            <div className={ styles.textBody }>
                <div className={ styles.textBodyInner }>
                    <RenderContentHelper blocks={body?.body as TextBlockType}/>
                    <Button type={"button"} title={"details"} href={"/selbsttest"}/>
                </div>


            </div>
            <div className={ styles.imageContainer }>
                <img src={ imgUrl } alt="Description"/>
            </div>
        </div>
    </Container>
}

export default TextImgSection;