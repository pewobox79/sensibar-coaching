import Stern from "../../assets/images/stern/stern_transparent_v2.png";
import SternDark from '@/assets/images/stern/stern_333.png'
import SternWhite from '@/assets/images/stern/stern_weiss.png'
import Image from "next/image";

const STERN_IMAGE_BY_BG_COLOR: Record<string, string> = {
    '#333': SternWhite.src,
    '#f0dfd3': SternDark.src,
    '#e2cec0': SternDark.src,
    '#fff': Stern.src
};

export default function SternElement({ bgColor }: { bgColor: string }) {

    console.log("bgColor", bgColor)
    const sternImageSrc = STERN_IMAGE_BY_BG_COLOR[bgColor] ?? SternWhite.src;

    return <Image src={sternImageSrc} alt="Logo" width={60} height={60} />;
}

