import {getPlaceholderImg} from "@/utils/placeholderImg";

export const createImgUrl = (imgData: string |undefined, placeholderWidth: number = 600, placeholderHeight: number = 400) => {

    if (!imgData) return getPlaceholderImg(placeholderWidth, placeholderHeight)

    return imgData
}