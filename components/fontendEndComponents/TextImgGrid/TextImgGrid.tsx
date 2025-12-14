import Container from "@/components/global/Container";
import RichTextRenderer from "@/components/strapi/RenderContentHelper";
import {getColor} from "@/utils/helper/colorHelper";
import {createImgUrl} from "@/utils/helper/imgHelper";
import styles from '@/styles/TextImgGrid.module.css'
import Button from "@/components/global/Button";
import { TextImgGridTypes} from "@/types/generalTypes";

const TextImgGrid = ({data}:{data: TextImgGridTypes}) => {

    const colorSet = getColor(data.bgColor.color)
    const buttonColorSet = getColor(data?.button?.bgColor?.color as string)
    return <Container id={ data.hashId } backgroundColor={ colorSet.bgColor }>
        <div className={ 'sectionInner' }>
            <div>
                <div className={ styles.textImgImagesGridTextGrid }>
                    <div>
                        <RichTextRenderer blocks={ data.leftTextBlock }/>
                        <div style={ {paddingBottom: 30} }></div>
                        <Button type={ "button" } title={ data.button.label }
                                style={ {color: buttonColorSet.color, backgroundColor: buttonColorSet.bgColor} }/></div>
                    <div><RichTextRenderer blocks={ data.rightTextBlock }/></div>
                </div>
            </div>

            { data.images && <div className={ styles.textImgImagesGrid }>
                { data?.images?.map((image: { url: string }) => {
                    return <img className={ styles.textImgImagesGridItem } key={ image.url }
                                src={ createImgUrl(image.url) }/>
                }) }
            </div> }
        </div>
    </Container>
}

export default TextImgGrid