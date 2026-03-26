import {Document, Image, Page, Text, View} from "@react-pdf/renderer";
import React from "react";
import logo from '@/assets/images/sensibar-coaching-logo-neu.png'
import {styles} from "@/lib/pdfCreator/templates/workshop/ticket/WorkshopTicketStyling";


type WorkshopTicketPdfProps = {
    workshopName: string;
    date: string;
    time: string;
    location: string;
    bookedBy: string;
    ticketNumber: string;
    format: string
};


const WorkshopTicketPdf =({
                              workshopName,
                              date,
                              time,
                              location,
                              bookedBy,
                              ticketNumber,
    format,
                          }: WorkshopTicketPdfProps) => {


    const qrURL ='data:image/png;base64,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'
    return <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
            <View style={styles.pageContent}>
                <View style={styles.ticketWrapper}>
                    <View style={styles.brandArea}>
                        <View>
                            <Text style={styles.brandLabel}>Ticket</Text>
                            <Image src={logo.src} style={styles.logo}/>

                        </View>

                        <Text style={styles.brandSubline}>
                            Bitte dieses Ticket zum Workshop mitbringen.
                        </Text>
                    </View>

                    <View style={styles.infoArea}>
                        <View>
                            <View style={styles.headerRow}>
                                <View style={styles.workshopTitleBlock}>
                                    <Text style={styles.eyebrow}>{format.toUpperCase()}</Text>
                                    <Text style={styles.workshopTitle}>{workshopName}</Text>
                                </View>

                                <View style={styles.ticketBadge}>
                                    <Text style={styles.ticketBadgeLabel}>Ticket-Nr.</Text>
                                    <Text style={styles.ticketBadgeNumber}>{ticketNumber}</Text>
                                </View>
                            </View>
                            <View style={styles.divider} />

                            <View style={styles.detailsGrid}>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>Datum</Text>
                                    <Text style={styles.detailValue}>{date}</Text>
                                        <Text style={styles.spacer}/>
                                    <Text style={[styles.detailLabel, {marginTop: 10}]}>Uhrzeit</Text>
                                    <Text style={styles.detailValue}>{time}</Text>
                                </View>

                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>Location</Text>
                                    <Text style={styles.detailValue}>{location}</Text>
                                        <Text style={styles.spacer}/>
                                    <Text style={[styles.detailLabel, {marginTop: 10}]}>Buchende Person</Text>
                                    <Text style={styles.detailValue}>{bookedBy}</Text>
                                </View>

                                <View style={styles.qrItem}>
                                    <View style={styles.qrBox}>
                                            <Image src={qrURL} style={styles.qrCode}/>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>
                                Dieses Ticket ist personalisiert und nur für die angegebene Buchung gültig.
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
}

export default WorkshopTicketPdf;