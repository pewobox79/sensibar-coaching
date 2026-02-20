import RichTextRenderer from "@/components/strapi/RenderContentHelper";
import {ReferenceType} from "@/types/generalTypes";
import {getColor} from "@/utils/helper/colorHelper";
import HanddrawnUnderlineCanvas from "@/components/fontendEndComponents/HanddrawnUnderlineCanvas";

const ReferenceItem = ({wer, referenz, color}: ReferenceType) => {
    return <div className='referenceItemWrapper'>
        <RichTextRenderer blocks={ referenz } textColor={getColor(color || "white").color}/>
        <div style={{ width: "80%", margin: "20px auto" }}>
            <HanddrawnUnderlineCanvas height={56} color={getColor("lightBeige").bgColor} />
        </div>
        <p style={{color: getColor(color || "white").color}}>{ wer }</p>
    </div>
}

export default ReferenceItem