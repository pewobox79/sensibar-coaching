import {getLegalLinks} from "@/lib/strapi/generalHelper";
import {LinkType} from "@/types/generalTypes";
import LinkElement from "@/components/global/LinkElement/LinkElement";

const LegalLinkSection = async () => {
    const legalLinks = await getLegalLinks()
    const data = legalLinks?.data
    const {link} = data

    return <div style={ {display: "flex", justifyContent: "center", flexWrap: "wrap"} }>
        { link.map((link: LinkType) => (<LinkElement key={link.id} {...link}/>))}</div>
}

export default LegalLinkSection