import TextImageSection from "@/components/fontendEndComponents/TextImgSection/TextImageSection";
import BackgroundImgWithText from "@/components/fontendEndComponents/BackgroundImgWithText";
import {
    GridBundleType,
    Items,
    JumbotronType,
    TextBlockType,
    TextImageSectionType
} from "@/types/generalTypes";
import TextBlock from "@/components/fontendEndComponents/TextBlock";
import GridSectionBundle from "@/components/fontendEndComponents/GridSection/GridSectionBundle";

const StrapiItemsRendering =(item:Items)=>{
    console.log("item in render", item)
    switch(item?.__component){
        case "elements.jumbotron":
            return <BackgroundImgWithText data={item as JumbotronType}/>
        case 'elements.text-block':
            return <TextBlock data={item as TextBlockType}/>
        case 'elements.grid-section':
            return <GridSectionBundle data={item as GridBundleType}/>
        case 'components.text-img-component':
            const textImageItem = item as TextImageSectionType;
            return <TextImageSection body={textImageItem?.text as TextImageSectionType["text"]} isTextLeft={textImageItem.textLeft} sectionId={textImageItem?.hashId ||''} image={textImageItem?.image} button={textImageItem.link } backgroundColor={textImageItem.bgColor}/>
        default: return <div>default</div>
    }

}

export default StrapiItemsRendering