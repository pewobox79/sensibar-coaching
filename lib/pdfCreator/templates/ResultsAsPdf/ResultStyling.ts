import {StyleSheet, Font} from "@react-pdf/renderer";
import {pdfColorSet} from "@/lib/pdfCreator/helper";


Font.register({
    family: 'Montserrat',
    src: 'https://fonts.gstatic.com/s/montserrat/v10/zhcz-_WihjSQC0oHJ9TCYC3USBnSvpkopQaUR-2r7iU.ttf'
});

Font.register({
    family: "Poppins",
    src:'https://fonts.gstatic.com/s/poppins/v1/TDTjCH39JjVycIF24TlO-Q.ttf'
})


export const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        color: pdfColorSet.BLACK_COLOR,
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
        border: `1.5px solid ${pdfColorSet.BEIGE_COLOR}`,
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
        color: pdfColorSet.BEIGE_COLOR,
        padding: 10
    },
    kategoryBg: {
        emotionale: {
            borderLeft: `5px solid ${pdfColorSet.EMOTIONAL_COLOR}`,
            flexDirection: "row" as const,
            padding: 10
        },
        sonsorische: {
            borderLeft: `5px solid ${pdfColorSet.BEIGE_COLOR}`,
            flexDirection: "row" as const,
            padding: 10,
        },
        soziale: {
            borderLeft: `5px solid ${pdfColorSet.GREY_COLOR}`,
            flexDirection: "row" as const,
            padding: 10,
        },
        kognitive: {
            borderLeft: `5px solid ${pdfColorSet.BLACK_COLOR}`,
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
        marginTop: 20,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        border: `1.5px solid ${pdfColorSet.BEIGE_COLOR}`,
        borderRadius: 10,
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