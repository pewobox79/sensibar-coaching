import TextImageSection from "@/components/fontendEndComponents/TextImgSection/TextImageSection";
import BackgroundImgWithText from "@/components/fontendEndComponents/BackgroundImgWithText";
import {Items, JumbotronType, TextImageSectionType} from "@/types/generalTypes";

const StrapiItemsRendering =(item:Items)=>{
    console.log("item in render", item)
    switch(item?.__component){
        case "elements.jumbotron":
            return <BackgroundImgWithText data={item as JumbotronType}/>
        case 'components.text-img-component':
            const textImageItem = item as TextImageSectionType;
            return <TextImageSection body={textImageItem?.text as TextImageSectionType["text"]} isTextLeft={textImageItem.textLeft} sectionId={"kjdlkf"} image={textImageItem?.image} button={textImageItem.link }/>
        default: return <div>default</div>
    }

}

export default StrapiItemsRendering