import Image from "next/image";
import brandLogo from '@/assets/images/aviareps_logo_blue_transp (1).webp';
import Link from "next/link";

const BrandLogo=({src="", size, link="/"}:{src?: string, size?: "small" |"medium" |"large"|"xlarge", link?:string})=>{

    let imageSize ={
        width: 100,
        height: 50,
    }

    switch(size){
        case "small":
            return imageSize={width: 100, height: 50} ;

        case "medium":
            return imageSize={width: 150, height: 75} ;

        case "large":
            return imageSize={width: 200, height: 100} ;

        case "xlarge":
            return imageSize={width: 250, height: 125} ;

        default: imageSize={width: 100, height: 50}
}

    return <Link href={link}><Image src={`${src ? src : brandLogo?.src}`} width={imageSize.width} height={imageSize.height}/></Link>
}

export default BrandLogo;