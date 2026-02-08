import styles from '@/styles/TextImageSection.module.css'
import Container from "@/components/global/Container";
import Button from "@/components/global/Button";
import RenderContentHelper from "@/components/strapi/RenderContentHelper";
import {createImgUrl} from "@/utils/helper/imgHelper";
import {TextBlock, TextImageSectionType} from "@/types/generalTypes";
import {getColor} from "@/utils/helper/colorHelper";

const TextImgSection = ({isTextLeft = false, backgroundColor, sectionId, body, button, image}: {
    body: TextImageSectionType["text"],
    button?: TextImageSectionType["link"],
    image: TextImageSectionType["image"],
    isTextLeft: boolean,
    backgroundColor?: TextImageSectionType["bgColor"],
    sectionId: string
}) => {
    const imgUrl = createImgUrl(image?.url)
    const buttonColor = getColor(button?.bgColor?.color as string)
    const background = getColor(backgroundColor?.color as string)
    const customStyle = isTextLeft ? styles.textImgSectionInnerLeftToRight : styles.textImgSectionInnerRightToRight
    return <Container backgroundColor={ background.bgColor } id={ sectionId }>
        <div className={ customStyle }>
            <div className={ styles.textBody }>
                <div className={ 'sectionInner' }>
                    <RenderContentHelper blocks={ body?.body as TextBlock } textColor={ background.color }/>
                    { button?.active && <Button type={ "button" } title={ button?.label } href={ button?.href }
                                                style={ {
                                                    backgroundColor: buttonColor.bgColor,
                                                    color: buttonColor.color
                                                } }/> }
                </div>
            </div>
            <div className={ styles.imageContainer }>
                <img src={ imgUrl } alt={image.alternativeText}/>
            </div>
        </div>
    </Container>
}

export default TextImgSection;