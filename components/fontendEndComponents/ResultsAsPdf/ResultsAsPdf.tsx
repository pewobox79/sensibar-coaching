import {Page, Text, View, Document, StyleSheet, Image, Font} from '@react-pdf/renderer';
import {useQuestionsStore} from "@/stores/useQuestionsStore";
import React from "react";
import logo from '@/assets/images/sensibar-coaching-logo-neu.png'
import checkIcon from '@/assets/icons/check-circle-sensibar.png'
import crossIcon from '@/assets/icons/cross-circle-sensibar.png'
import contactImg from '@/assets/images/qr-sensibar-coaching-kontakt.png'
import resultArrow from '@/assets/icons/sensibar-test-result-arrow.png'
import {getActualYear} from "@/utils/helper/formater";
import {getResultDescription} from "@/lib/pdfCreator/helper";

Font.register({
    family: 'Montserrat',
    src: 'https://fonts.gstatic.com/s/montserrat/v10/zhcz-_WihjSQC0oHJ9TCYC3USBnSvpkopQaUR-2r7iU.ttf'
});

Font.register({
    family: "Poppins",
    src:'https://fonts.gstatic.com/s/poppins/v1/TDTjCH39JjVycIF24TlO-Q.ttf'
})

const BLACK_COLOR = '#171717'
const BEIGE_COLOR = '#E6D3C6'
// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        color: BLACK_COLOR,
        fontFamily: 'Montserrat'
    },
    section: {
        margin: 10,
        padding: 10
    },
    answerText: {
        width: "35%",
        justifyContent: "center",
        alignItems: "flex-end",
        fontSize: 12
    },
    header: {
        fontSize: 22,
        textAlign: "center",
        paddingBottom: 10,
        fontFamily: 'Poppins'
    },
    legende: {
        flexDirection: "row",
        marginBottom: 10,
        justifyContent: "space-between",
        fontSize: 12,
    },
    h3: {
        margin: "10 0",
        fontSize: "0.8rem",
        fontWeight: "bold"
    },
    title: {
        paddingTop: 5,
        width: "65%",
        flexWrap: "wrap",
        fontSize: 12
    },
    resultSection:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
        border: `1.5px solid ${BEIGE_COLOR}`,
        borderRadius: 10,
        padding: 10
    },
    resultSummary:{
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingRight: 35,
        width: "85%"
    },
    resultArrow:{
        width: 38,
        paddingRight:15
    },
    resultTitle: {
        fontSize: 12,
        marginBottom: 10,
        fontWeight: "bold"
    },
    resultDescription:{
        fontSize: 12,
        marginBottom: 10
    },
    resultValue:{
        fontSize:18,
        color: BEIGE_COLOR,
        padding: 10
    },
    kategoryBg: {
        emotionale: {
            borderLeft: `5px solid ${BEIGE_COLOR}`,
            flexDirection: "row" as const,
            padding: 10
        },
        sensorische: {
            borderLeft: "5px solid blue",
            flexDirection: "row" as const,
            padding: 10,
        },
        soziale: {
            borderLeft: `5px solid ${BLACK_COLOR}`,
            flexDirection: "row" as const,
            padding: 10,
        },
        kognitive: {
            borderLeft: "5px solid red",
            flexDirection: "row" as const,
            padding: 10
        }
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 10,
        bottom: 20,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: '#171717'
    },
    logo: {
        width: 160
    },
    contactSection:{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        border: "1px solid black"
    },
    copyright: {
        position: 'absolute',
        fontSize: 10,
        bottom: 40,
        left: 0,
        right: 0,
        textAlign: 'center',
    },
    crossIcon: {
        width: 25,
        height: 25,
    },
    checkIcon: {
        width: 25,
        height: 25
    },
    noteLine: {
        fontSize: 12,
        color: 'grey',
        borderBottom: '1px solid grey',
        width: '80%',
        padding: '12px 0'
    },
    qrCodeContainer: {
        width:"50%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        fontSize: 12,
    },
    qrCode: {
        width: 35,
        height: 35
    },

});

// Create Document Component
const ResultsAsPdf = ({context, value}: { value: string, context: { title: string, description: [] } }) => {

    const {values} = useQuestionsStore()

    console.log("values", values, checkIcon)

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
                    <Text style={styles.resultDescription}>{getResultDescription(context.title)}</Text>
                </View>
                <View style={styles.resultValue}>
                    <Text>{value}</Text>
                </View>
            </View>
            <Text style={ styles.h3 }>Kategorien</Text>
            <View style={ styles.legende }>
                <Text style={ styles.kategoryBg["emotionale"] }>Emotionale</Text>
                <Text style={ styles.kategoryBg["kognitive"] }>Kognitive</Text>
                <Text style={ styles.kategoryBg["soziale"] }>Soziale</Text>
                <Text style={ styles.kategoryBg["sensorische"] }>Sensorische</Text>
            </View>
            <Text style={ styles.h3 }>Das hast Du im Test geantwortet:</Text>
            { ListOfAnswers }

           <View style={styles.contactSection}>
               <Text style={ styles.resultDescription }>hier ist dann der text für deine empfehlung mit kontakt und qr code zu </Text>
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