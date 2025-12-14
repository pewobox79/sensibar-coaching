import {createImgUrl} from "@/utils/helper/imgHelper";

const BackgroundImage =({imageUrl}:{imageUrl:string})=>{
    if(!imageUrl) return null
    const imgUrl = createImgUrl(imageUrl)
    console.log("imageURl", imgUrl)
    const backgroundStyle={
        backgroundImage: `url(${imgUrl})`,
        backgroundSize:'cover',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        height: '100%',
        width: '100%'
    }
    return <div style={backgroundStyle}></div>
}

export default BackgroundImage