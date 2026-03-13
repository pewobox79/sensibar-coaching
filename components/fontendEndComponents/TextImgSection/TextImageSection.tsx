import styles from '@/styles/TextImageSection.module.css'
import Container from "@/components/global/Container";
import Button from "@/components/global/Button";
import RenderContentHelper from "@/components/strapi/RenderContentHelper";
import { getBestAvailableImgResolution} from "@/utils/helper/imgHelper";
import {TextBlock, TextImageSectionType} from "@/types/generalTypes";
import {getColor} from "@/utils/helper/colorHelper";
import PolaroidElement from "@/components/global/PolaroidElement/PolaroidElement";

const TextImgSection = ({isTextLeft = false, backgroundColor, sectionId, body, button, image, hasPolaroid}: {
    body: TextImageSectionType["text"],
    button?: TextImageSectionType["link"],
    image: TextImageSectionType["image"],
    isTextLeft: boolean,
    backgroundColor?: TextImageSectionType["bgColor"],
    sectionId: string
    hasPolaroid?: boolean
}) => {
    const img = getBestAvailableImgResolution(image)
    const buttonColor = getColor(button?.bgColor?.color as string)
    const background = getColor(backgroundColor?.color as string)
    const customStyle = isTextLeft ? styles.textImgSectionInnerLeftToRight : styles.textImgSectionInnerRightToRight
    return <Container backgroundColor={ background.bgColor } id={ sectionId }>
        <div className={ customStyle }>
            <div className={hasPolaroid ? styles.textBodyForPolaroid : styles.textBody } >
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
                {hasPolaroid ? <PolaroidElement backgroundColor={buttonColor.bgColor}><img src={ img.url } alt={image?.alternativeText ||"Sensibar Coaching hochsensible menschen"}/></PolaroidElement>:<img src={ img.url } alt={image?.alternativeText ||"Sensibar Coaching hochsensible menschen"}/>}
            </div>
        </div>
    </Container>
}

export default TextImgSection;