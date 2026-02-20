'use client'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import ReferenceItem from "@/components/fontendEndComponents/References/ReferenceItem";
import '@/styles/References.css'
import Container from "@/components/global/Container";
import {BgColorType, ReferencesTypes} from "@/types/generalTypes";
import {getColor} from "@/utils/helper/colorHelper";

const ReferencesSlider = ({references, bgColor, title}: { references: ReferencesTypes["data"], bgColor: BgColorType, title: string }) => {
    const ListOfReferences = references.map((reference)=>{
        return <ReferenceItem key={reference.documentId} {...reference} color={bgColor?.color}/>
    })
    return <Container id={"references"} backgroundColor={getColor(bgColor?.color || "white").bgColor}>
        <h2 className='referenceHeading' style={ {color: getColor(bgColor.color).color} }>{ title || '' }</h2>
        <div className='referenceWrapper'>
        <Carousel autoPlay={true} dynamicHeight={true} emulateTouch={true} showIndicators={false} showStatus={false} infiniteLoop={true} showArrows={false}>
            { ListOfReferences }
        </Carousel>
        </div>
    </Container>
}

export default ReferencesSlider