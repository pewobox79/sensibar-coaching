import {Page, Text, View, Document, Image} from '@react-pdf/renderer';
import {useQuestionsStore} from "@/stores/useQuestionsStore";
import React from "react";
import logo from '@/assets/images/sensibar-coaching-logo-neu.png'
import checkIcon from '@/assets/icons/check-circle-sensibar.png'
import crossIcon from '@/assets/icons/cross-circle-sensibar.png'
import contactImg from '@/assets/images/qr-sensibar-coaching-kontakt.png'
import resultArrow from '@/assets/icons/sensibar-test-result-arrow.png'
import {getActualYear} from "@/utils/helper/formater";
import {getResultDescription} from "@/lib/pdfCreator/helper";
import {styles} from "@/lib/pdfCreator/templates/ResultsAsPdf/ResultStyling";

// Create Document Component
const ResultsAsPdf = ({context, value}: { value: string, context: { title: string, description: [] } }) => {

    const {values} = useQuestionsStore()
    const ListOfAnswers = values.map(answer => {
        return <View key={ answer.question } style={ styles.kategoryBg[answer.kategory.toLowerCase() as keyof typeof styles.kategoryBg] }>
            <Text style={ styles.title }>{ answer.question }</Text>
            <View style={ styles.answerText }>
                <Text style={ styles.answerText }>
                    { answer.answer === "true" ? <Image style={ styles.checkIcon } src={ checkIcon.src } /> :
                        <Image style={ styles.crossIcon } src={ crossIcon.src }/> }
                </Text>

            </View>
        </View>
    })
    return <Document>
        <Page size="A4" style={ styles.page }>
            <View style={ styles.headerContainer }>
                <Image
                    style={ styles.logo }
                    src={ logo.src }
                />
                <Text style={ styles.header }>Selbsttest Hochsensibilität</Text></View>
            <Text style={ styles.h3 }>Dein Testergebnis</Text>
            <View style={styles.resultSection}>
                <Image style={styles.resultArrow} src={resultArrow.src}/>
                <View style={styles.resultSummary}><Text style={ styles.resultTitle }>{ context.title }</Text>
                    <Text style={styles.resultDescription}>{getResultDescription(context.title.toLowerCase()).description}</Text>
                </View>
                <View style={styles.resultValue}>
                    <Text>{value}</Text>
                </View>
            </View>
            <Text style={ styles.h3 }>Kategorien</Text>
            <View style={ styles.legende }>
                <Text style={ styles.kategoryBg["emotionale"] }>Emotionale</Text>
                <Text style={ styles.kategoryBg["sonsorische"] }>Sensorische</Text>
                <Text style={ styles.kategoryBg["soziale"] }>Soziale</Text>
                <Text style={ styles.kategoryBg["kognitive"] }>Kognitive</Text>

            </View>
            <Text style={ styles.h3 }>Das hast Du im Test geantwortet:</Text>
            { ListOfAnswers }

           <View style={styles.contactSection}>
               <Text style={ styles.resultDescription }>{getResultDescription(context.title.toLowerCase()).cta}</Text>
               <View style={styles.qrCodeContainer}>
                   <Text>Scannen und Kennenlernen</Text>
                   <Image src={contactImg.src} style={styles.qrCode}/>
               </View>
           </View>

            <Text style={ styles.copyright } fixed>&copy; { getActualYear() } Yessica Wolf. All Rights Reserved.</Text>
            <Text style={ styles.pageNumber } render={ ({pageNumber, totalPages}) => (
                `${ pageNumber } / ${ totalPages }`
            ) } fixed/>
        </Page>
    </Document>

};

export default ResultsAsPdf