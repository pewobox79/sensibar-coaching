import Container from "@/components/global/Container";
import {QuoteSectionTypes} from "@/types/generalTypes";
import {getColor} from "@/utils/helper/colorHelper";
import BackgroundImage from "@/components/global/BackgroundImage";
import Button from "@/components/global/Button";
import styles from '@/styles/QuoteSection.module.css'

const QuoteSection = ({data}: { data: QuoteSectionTypes }) => {

    const colorSet = getColor(data?.bgColor?.color)
    const btnColorSet = getColor(data?.button?.bgColor?.color as string)

    return <Container id={ data.hashId } backgroundColor={ colorSet.bgColor }>
        <div className={styles.quoteSectionInner} >
            { data.hasBgImage && <BackgroundImage imageUrl={ data?.image?.url as string }/> }
            <div className={styles.quoteTextBlock}>
                <h2 style={{textAlign: "center", color: `${colorSet.color}`}}>{ data.title }</h2>
                <h3 style={{textAlign: "center", color: `${colorSet.color}`}}>Yessica Wolf</h3>
                <div className={styles.quoteButton}>{data.button && <Button type={"button"} title={data?.button?.label} href={data?.button?.href} style={{backgroundColor: btnColorSet.bgColor, margin: "auto", width: "50%"}}/>}</div>

            </div>


        </div>
    </Container>
}

export default QuoteSection