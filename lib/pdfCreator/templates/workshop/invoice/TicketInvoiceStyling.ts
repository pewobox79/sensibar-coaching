
import {StyleSheet, Font} from "@react-pdf/renderer";


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
        paddingTop: 42,
        paddingBottom: 42,
        paddingHorizontal: 42,
        backgroundColor: "#ffffff",
        color: "#2f2a26",
        fontSize: 10,
        fontFamily: "Poppins",
    },
    topBar: {
        height: 8,
        backgroundColor: "#7d5a50",
        marginBottom: 24,
        borderRadius: 4,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    brandBlock: {
        width: "54%",
    },
    brandName: {
        fontSize: 22,
        fontFamily: "Montserrat",
        fontWeight: "bold",
        marginBottom: 6,
        color: "#2f2a26",
    },
    brandSubline: {
        fontSize: 10,
        color: "#7c7068",
        lineHeight: 1.5,
    },
    metaBlock: {
        width: "38%",
        backgroundColor: "#f7f2ec",
        border: "1 solid #dfd4c8",
        borderRadius: 10,
        padding: 14,
    },
    metaTitle: {
        fontSize: 16,
        fontFamily: "Montserrat",
        fontWeight: "bold",
        marginBottom: 10,
        color: "#7d5a50",
    },
    metaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    metaLabel: {
        width: "42%",
        fontSize: 9,
        color: "#8b7b70",
    },
    metaValue: {
        width: "58%",
        fontSize: 9,
        textAlign: "right",
        color: "#2f2a26",
    },
    addressRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 26,
        gap: 18,
    },
    addressCard: {
        width: "48%",
        border: "1 solid #e4dbd1",
        borderRadius: 10,
        padding: 14,
        minHeight: 110,
    },
    addressLabel: {
        fontSize: 9,
        textTransform: "uppercase",
        color: "#8b7b70",
        marginBottom: 8,
        letterSpacing: 0.8,
    },
    addressText: {
        fontSize: 10,
        lineHeight: 1.6,
        color: "#2f2a26",
    },
    sectionTitle: {
        fontSize: 12,
        fontFamily: "Montserrat",
        fontWeight: "bold",
        marginBottom: 10,
        color: "#2f2a26",
    },
    introBox: {
        backgroundColor: "#fcfaf7",
        border: "1 solid #e4dbd1",
        borderRadius: 10,
        padding: 14,
        marginBottom: 20,
    },
    introText: {
        fontSize: 10,
        lineHeight: 1.6,
        color: "#4a433e",
    },
    table: {
        border: "1 solid #ded4c9",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#f4efe8",
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    tableHeaderText: {
        fontSize: 9,
        fontFamily: "Montserrat",
        fontWeight: "bold",
        color: "#6a5d55",
        textTransform: "uppercase",
    },
    tableRow: {
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderTop: "1 solid #ece3d8",
    },
    colPos: {
        width: "8%",
    },
    colDesc: {
        width: "44%",
        paddingRight: 10,
    },
    colQty: {
        width: "10%",
        textAlign: "right",
    },
    colUnit: {
        width: "18%",
        textAlign: "right",
    },
    colTax: {
        width: "10%",
        textAlign: "right",
    },
    colTotal: {
        width: "10%",
        textAlign: "right",
    },
    cellText: {
        fontSize: 9,
        lineHeight: 1.5,
        color: "#2f2a26",
    },
    noteRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 20,
        marginBottom: 24,
    },
    noteBox: {
        width: "56%",
        border: "1 solid #e4dbd1",
        borderRadius: 10,
        padding: 14,
        backgroundColor: "#fffdf9",
    },
    noteTitle: {
        fontSize: 10,
        fontFamily: "Montserrat",
        fontWeight: "bold",
        marginBottom: 8,
        color: "#2f2a26",
    },
    noteText: {
        fontSize: 9,
        lineHeight: 1.6,
        color: "#5a514b",
    },
    totalsBox: {
        width: "38%",
        border: "1 solid #d8cfc2",
        borderRadius: 10,
        padding: 14,
        backgroundColor: "#f7f2ec",
    },
    totalsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    totalsLabel: {
        fontSize: 10,
        color: "#5f554f",
    },
    totalsValue: {
        fontSize: 10,
        color: "#2f2a26",
        textAlign: "right",
    },
    grandTotalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
        paddingTop: 10,
        borderTop: "1 solid #d8cfc2",
    },
    grandTotalLabel: {
        fontSize: 12,
        fontFamily: "Montserrat",
        fontWeight: "bold",
        color: "#2f2a26",
    },
    grandTotalValue: {
        fontSize: 12,
        fontFamily: "Montserrat",
        fontWeight: "bold",
        color: "#7d5a50",
    },
    footer: {
        borderTop: "1 solid #e6ddd2",
        paddingTop: 14,
    },
    footerText: {
        fontSize: 8,
        color: "#8b7b70",
        lineHeight: 1.5,
    },
});