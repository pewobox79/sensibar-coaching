import RichTextRenderer from "@/components/strapi/RenderContentHelper";
import Container from "@/components/global/Container";
import {TextBlockType} from "@/types/generalTypes";
import {getColor} from "@/utils/helper/colorHelper";

const TextBlock = ({data}: { data: TextBlockType }) => {
    const textBlockColors = getColor(data?.bgColor?.color)
    return <Container id={ data.hashId} backgroundColor={textBlockColors.bgColor}>
        <div className='sectionInner'>
        <RichTextRenderer blocks={ data?.body as TextBlockType["body"] } textColor={textBlockColors.color}/>
        </div>
    </Container>
}

export default TextBlock