import {IMAGE_SIZE_PRIORITY, ImageType} from "@/types/generalTypes";
import bgImage from '@/assets/images/sensibar-stern-square.png'
export const getBestAvailableImgResolution = (
    imgData: ImageType,
    preferredSize: IMAGE_SIZE_PRIORITY = "medium"
) => {
    if (!imgData) {
        return {
            url: bgImage?.src,
            alt: "whirlpools bayern"
        };
    }

    const fallbackOrderMap: Record<IMAGE_SIZE_PRIORITY, Array<keyof NonNullable<ImageType["formats"]>>> = {
        thumbnail: ["thumbnail", "small", "medium", "large"],
        small: ["small", "thumbnail", "medium", "large"],
        medium: ["medium", "small", "large", "thumbnail"],
        large: ["large", "medium", "small", "thumbnail"],
        original: ["large", "medium", "small", "thumbnail"]
    };

    const selectedFormat =
        preferredSize === "original"
            ? undefined
            : fallbackOrderMap[preferredSize]
                .map((size) => imgData?.formats?.[size])
                .find(Boolean);

    return {
        url: selectedFormat?.url || imgData?.url,
        alt: imgData?.alternativeText || "whirlpools bayern"
    };
};
