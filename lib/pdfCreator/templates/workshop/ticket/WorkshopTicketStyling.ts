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
        backgroundColor: "#fff",
        paddingTop: 50,
        paddingHorizontal: 50,
        fontSize: 11,
        color: pdfColorSet.GREY_COLOR,
        fontFamily: "Montserrat",
    },
    pageContent: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    ticketWrapper: {
        width: "82%",
        height: "28%",
        minHeight: 170,
        display: "flex",
        flexDirection: "row",
        borderRadius: 14,
        overflow: "hidden",
        backgroundColor: pdfColorSet.BG_COLOR_80,
        border: "1 solid #d8cfc2",
    },
    brandArea: {
        width: "28%",
        backgroundColor: pdfColorSet.SENSIBAR_BEIGE,
        paddingTop: 10,
        paddingBottom: 15,
        paddingHorizontal: 15,
        justifyContent: "space-between",
    },
    logo:{
      height: 35,
    },
    brandLabel: {
        fontSize: 10,
        textTransform: "uppercase",
        letterSpacing: 1.5,
        marginBottom: 10,
    },
    brandTitle: {
        fontSize: 22,
        fontWeight: "bold",
        lineHeight: 1.25,
    },
    brandSubline: {
        fontSize: 10,
        marginTop: 12,
        lineHeight: 1.4,
    },
    infoArea: {
        width: "72%",
        paddingTop: 10,
        paddingBottom: 18,
        paddingHorizontal: 24,
        display: "flex",
        justifyContent: "space-between",
    },
    headerRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 14,
    },
    workshopTitleBlock: {
        width: "74%",
    },
    eyebrow: {
        fontSize: 9,
        textTransform: "uppercase",
        letterSpacing: 1.2,
        color: "#9c8778",
        marginBottom: 5,
    },
    workshopTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: pdfColorSet.GREY_COLOR,
        lineHeight: 1.2,
    },
    ticketBadge: {
        border: `1px solid ${pdfColorSet.SENSIBAR_BEIGE}`,
        borderRadius: 10,
        paddingTop: 6,
        paddingBottom: 6,
        paddingHorizontal: 12,
        backgroundColor: pdfColorSet.BEIGE_COLOR,
    },
    ticketBadgeLabel: {
        fontSize: 8,
        textTransform: "uppercase",
        color: "#9c8778",
        marginBottom: 3,
    },
    ticketBadgeNumber: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#7d5a50",
    },
    divider: {
        marginTop: 12,
        borderBottom: `1px solid ${pdfColorSet.SENSIBAR_BEIGE}`,
        marginBottom: 14,
    },
    detailsGrid: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        alignItems: "stretch",
    },
    detailItem: {
        width: "31%",
        marginBottom: 30,
        paddingRight: 12,
    },
    spacer:{
        paddingTop: 10,
        paddingBottom: 10,
    },
    qrItem: {
        width: "38%",
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 2,
        paddingRight: 2,
    },
    qrBox: {
        width: 100,
        height: 130,
        border: `1px solid ${pdfColorSet.SENSIBAR_BEIGE}`,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    detailLabel: {
        fontSize: 8,
        textTransform: "uppercase",
        letterSpacing: 1,
        color: "#9c8778",
        marginBottom: 10,
    },
    detailValue: {
        fontSize: 12,
        color: pdfColorSet.GREY_COLOR,
        lineHeight: 1.15,
    },
    qrCode:{
        width: 80,
        height: 160
    },
    footer: {
        marginTop: 8,
        paddingTop: 10,
    },
    footerText: {
        paddingTop: 8,
        fontSize: 9,
        color: "#8b7b70",
    },
});


