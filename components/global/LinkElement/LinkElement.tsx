import {getColor} from "@/utils/helper/colorHelper";
import {LinkType} from "@/types/generalTypes";

const LinkElement = (link: LinkType) => {
    const textLinkColor = getColor(link?.bgColor?.color as string)
    return <a className={ 'globalTextLink' }
              style={ {color: textLinkColor.color} }
              href={ link.href }
              target={ link.target === "internal" ? "_self" : "_blank" }
              key={ link.id }>{ link.label }</a>
}

export default LinkElement