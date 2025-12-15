import TextImageSection from "@/components/fontendEndComponents/TextImgSection/TextImageSection";
import BackgroundImgWithText from "@/components/fontendEndComponents/BackgroundImgWithText";
import {
    ContactSectionTypes,
    GridBundleType,
    Items,
    JumbotronType, QuoteSectionTypes,
    TextBlockType,
    TextImageSectionType, TextImgGridTypes
} from "@/types/generalTypes";
import TextBlock from "@/components/fontendEndComponents/TextBlock";
import GridSectionBundle from "@/components/fontendEndComponents/GridSection/GridSectionBundle";
import QuoteSection from "@/components/fontendEndComponents/QuoteSection";
import TextImgGrid from "@/components/fontendEndComponents/TextImgGrid/TextImgGrid";
import ContactSection from "@/components/fontendEndComponents/ContactSection";

const StrapiItemsRendering =(item:Items)=>{
    console.log("item", item)
    switch(item?.__component){
        case "elements.jumbotron":
            return <BackgroundImgWithText data={item as JumbotronType}/>
        case 'elements.text-block':
            return <TextBlock data={item as TextBlockType}/>
        case 'elements.grid-section':
            return <GridSectionBundle data={item as GridBundleType}/>
        case 'components.quote-section':
            return <QuoteSection data={item as QuoteSectionTypes}/>
        case 'components.text-img-grid':
            return <TextImgGrid data={item as TextImgGridTypes}/>
        case 'components.contact':
            return <ContactSection data={item as ContactSectionTypes}/>
        case 'components.text-img-component':
            const textImageItem = item as TextImageSectionType;
            return <TextImageSection body={textImageItem?.text as TextImageSectionType["text"]} isTextLeft={textImageItem?.textLeft} sectionId={textImageItem?.hashId ||''} image={textImageItem?.image} button={textImageItem.link } backgroundColor={textImageItem.bgColor}/>
        default: return <div>No component available</div>
    }

}

export default StrapiItemsRendering