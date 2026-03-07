import {getBestAvailableImgResolution} from "@/utils/helper/imgHelper";
import {ImageType} from "@/types/generalTypes";

const BackgroundImage =({image}:{image:ImageType})=>{

    const selectedImage = getBestAvailableImgResolution(image)
    if(!selectedImage) return null
    const backgroundStyle={
        backgroundImage: `url(${selectedImage.url})`,
        backgroundSize:'cover',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        height: '100%',
        width: '100%'
    }
    return <div style={backgroundStyle}></div>
}

export default BackgroundImage