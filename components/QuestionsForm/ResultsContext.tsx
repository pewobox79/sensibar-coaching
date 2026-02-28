'use client'
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {getTestResultsByHighestValue} from "@/lib/strapi/generalHelper";
import {useEffect, useState} from "react";
import RenderContentHelper from "@/components/strapi/RenderContentHelper";
import ResultsAsPdf from "@/components/fontendEndComponents/ResultsAsPdf/ResultsAsPdf";
import {PDFDownloadLink} from "@react-pdf/renderer";
import styles from '@/styles/Blocks.module.css'
const ResultsContext = ({value}: { value: string }) => {
    const token = useLocalStorage("sensiUser")?.value;
    const [context, setContext] = useState<{ title: string, description: [] }>({title: "", description: []})

    useEffect(() => {
        getTestResultsByHighestValue(token?.jwt, Number(value)).then(res => {
            setContext({...context, title: res.data[0].title, description: res.data[0]?.description})

        })
    }, []);

    return <div className={styles.sectionWrapper}>

        <h2>{ context.title }</h2>
        <RenderContentHelper blocks={ context?.description ? context?.description : [] }/>
        <PDFDownloadLink className={ "globalButton" } document={ <ResultsAsPdf context={context} value={value}/> }
                         fileName="sensibar-selbsttest-ergebnis.pdf">
            { ({loading}) =>
                loading ? 'Dokument lädt...' : 'Download Ergebnis'
            }
        </PDFDownloadLink>
    </div>
}

export default ResultsContext