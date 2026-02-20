import ReferencesSlider from "@/components/fontendEndComponents/References/ReferencesSlider";
import {getReferences} from "@/lib/strapi/generalHelper";
import {BgColorType, ReferencesTypes} from "@/types/generalTypes";

const References =async ({data}:{data: { bgColor: BgColorType, title: string |undefined }})=>{
    const references:ReferencesTypes = await getReferences()
    return <ReferencesSlider references={references.data as ReferencesTypes["data"]} bgColor={data.bgColor} title={data?.title ||""}/>
}
export default References