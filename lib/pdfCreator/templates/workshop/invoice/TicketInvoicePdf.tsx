import {Document, Page, Text, View} from "@react-pdf/renderer";
import React from "react";
import {styles} from "@/lib/pdfCreator/templates/workshop/invoice/TicketInvoiceStyling";


type Party = {
    name: string;
    street: string;
    zip: string;
    city: string;
    country?: string;
};

type TicketInvoicePdfProps = {
    seller: Party;
    buyer: Party;
    invoiceNumber: string;
    invoiceDate: string;
    serviceDate: string;
    workshopName: string;
    workshopDate: string;
    workshopTime: string;
    workshopLocation: string;
    bookedBy: string;
    ticketNumber: string;
    quantity: number;
    unitPriceNet: number;
    vatRate?: number;
    taxNumber?: string;
    vatId?: string;
    paymentMethod?: string;
    paymentStatus?: string;
    isSmallBusiness?: boolean;
    currency?: string;
};

const formatMoney = (value: number, currency: string) => {
    return `${value.toFixed(2).replace(".", ",")} ${currency}`;
};

const formatParty = (party: Party) => {
    return [
        party.name,
        party.street,
        `${party.zip} ${party.city}`,
        party.country ? party.country : null,
    ]
        .filter(Boolean)
        .join("\n");
};

const TicketInvoicePdf = ({
                              seller,
                              buyer,
                              invoiceNumber,
                              invoiceDate,
                              serviceDate,
                              workshopName,
                              workshopDate,
                              workshopTime,
                              workshopLocation,
                              bookedBy,
                              ticketNumber,
                              quantity,
                              unitPriceNet,
                              vatRate = 19,
                              taxNumber,
                              vatId,
                              paymentMethod = "Online-Zahlung",
                              paymentStatus = "Bezahlt",
                              isSmallBusiness = false,
                              currency = "EUR",
                          }: TicketInvoicePdfProps) => {

    const netAmount = quantity * unitPriceNet;
    const vatAmount = isSmallBusiness ? 0 : netAmount * (vatRate / 100);
    const grossAmount = netAmount + vatAmount;

    const taxOrVatLabel = taxNumber ? "Steuernummer" : "USt-IdNr.";
    const taxOrVatValue = taxNumber ? taxNumber : vatId ? vatId : "—";


    return  <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.topBar} />

            <View style={styles.header}>
                <View style={styles.brandBlock}>
                    <Text style={styles.brandName}>{seller.name}</Text>
                    <Text style={styles.brandSubline}>
                        Professionelle Rechnungsübersicht für Workshop-Tickets
                    </Text>
                </View>

                <View style={styles.metaBlock}>
                    <Text style={styles.metaTitle}>Rechnung</Text>

                    <View style={styles.metaRow}>
                        <Text style={styles.metaLabel}>Rechnungsnr.</Text>
                        <Text style={styles.metaValue}>{invoiceNumber}</Text>
                    </View>

                    <View style={styles.metaRow}>
                        <Text style={styles.metaLabel}>Rechnungsdatum</Text>
                        <Text style={styles.metaValue}>{invoiceDate}</Text>
                    </View>

                    <View style={styles.metaRow}>
                        <Text style={styles.metaLabel}>Leistungsdatum</Text>
                        <Text style={styles.metaValue}>{serviceDate}</Text>
                    </View>

                    <View style={styles.metaRow}>
                        <Text style={styles.metaLabel}>Zahlungsart</Text>
                        <Text style={styles.metaValue}>{paymentMethod}</Text>
                    </View>

                    <View style={styles.metaRow}>
                        <Text style={styles.metaLabel}>Status</Text>
                        <Text style={styles.metaValue}>{paymentStatus}</Text>
                    </View>

                    <View style={styles.metaRow}>
                        <Text style={styles.metaLabel}>{taxOrVatLabel}</Text>
                        <Text style={styles.metaValue}>{taxOrVatValue}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.addressRow}>
                <View style={styles.addressCard}>
                    <Text style={styles.addressLabel}>Rechnungsaussteller</Text>
                    <Text style={styles.addressText}>{formatParty(seller)}</Text>
                </View>

                <View style={styles.addressCard}>
                    <Text style={styles.addressLabel}>Rechnungsempfänger</Text>
                    <Text style={styles.addressText}>{formatParty(buyer)}</Text>
                </View>
            </View>

            <View style={styles.introBox}>
                <Text style={styles.sectionTitle}>Abgerechnete Leistung</Text>
                <Text style={styles.introText}>
                    Berechnet wird ein personalisiertes Workshop-Ticket für die unten aufgeführte Veranstaltung.
                    Die Rechnung enthält alle relevanten Ticket- und Leistungsinformationen.
                </Text>
            </View>

            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={[styles.tableHeaderText, styles.colPos]}>Pos.</Text>
                    <Text style={[styles.tableHeaderText, styles.colDesc]}>Leistungsbeschreibung</Text>
                    <Text style={[styles.tableHeaderText, styles.colQty]}>Menge</Text>
                    <Text style={[styles.tableHeaderText, styles.colUnit]}>Einzelpreis</Text>
                    <Text style={[styles.tableHeaderText, styles.colTax]}>USt.</Text>
                    <Text style={[styles.tableHeaderText, styles.colTotal]}>Betrag</Text>
                </View>

                <View style={styles.tableRow}>
                    <Text style={[styles.cellText, styles.colPos]}>1</Text>

                    <View style={styles.colDesc}>
                        <Text style={styles.cellText}>Workshop-Ticket: {workshopName}</Text>
                        <Text style={styles.cellText}>Datum: {workshopDate}</Text>
                        <Text style={styles.cellText}>Uhrzeit: {workshopTime}</Text>
                        <Text style={styles.cellText}>Ort: {workshopLocation}</Text>
                        <Text style={styles.cellText}>Buchende Person: {bookedBy}</Text>
                        <Text style={styles.cellText}>Ticketnummer: {ticketNumber}</Text>
                    </View>

                    <Text style={[styles.cellText, styles.colQty]}>{quantity}</Text>
                    <Text style={[styles.cellText, styles.colUnit]}>
                        {formatMoney(unitPriceNet, currency)}
                    </Text>
                    <Text style={[styles.cellText, styles.colTax]}>
                        {isSmallBusiness ? "—" : `${vatRate} %`}
                    </Text>
                    <Text style={[styles.cellText, styles.colTotal]}>
                        {formatMoney(netAmount, currency)}
                    </Text>
                </View>
            </View>

            <View style={styles.noteRow}>
                <View style={styles.noteBox}>
                    <Text style={styles.noteTitle}>Hinweise</Text>

                    <Text style={styles.noteText}>
                        Leistungsdatum: {serviceDate}
                    </Text>
                    <Text style={styles.noteText}>
                        Zahlungsstatus: {paymentStatus}
                    </Text>
                    <Text style={styles.noteText}>
                        Zahlungsart: {paymentMethod}
                    </Text>

                    {isSmallBusiness ? (
                        <Text style={styles.noteText}>
                            Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.
                        </Text>
                    ) : (
                        <Text style={styles.noteText}>
                            Enthalten ist die gesetzliche Umsatzsteuer in ausgewiesener Höhe.
                        </Text>
                    )}
                </View>

                <View style={styles.totalsBox}>
                    <View style={styles.totalsRow}>
                        <Text style={styles.totalsLabel}>Nettobetrag</Text>
                        <Text style={styles.totalsValue}>{formatMoney(netAmount, currency)}</Text>
                    </View>

                    <View style={styles.totalsRow}>
                        <Text style={styles.totalsLabel}>Umsatzsteuer</Text>
                        <Text style={styles.totalsValue}>
                            {isSmallBusiness ? formatMoney(0, currency) : formatMoney(vatAmount, currency)}
                        </Text>
                    </View>

                    <View style={styles.grandTotalRow}>
                        <Text style={styles.grandTotalLabel}>Gesamtbetrag</Text>
                        <Text style={styles.grandTotalValue}>{formatMoney(grossAmount, currency)}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Diese Rechnung wurde elektronisch erstellt und ist ohne Unterschrift gültig.
                </Text>
            </View>
        </Page>
    </Document>
}

export default TicketInvoicePdf;