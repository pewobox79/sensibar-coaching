import {Document, Image, Page, Text, View, Link} from "@react-pdf/renderer";
import React, {useEffect} from "react";
import logo from '@/assets/images/sensibar-coaching-logo-neu.png'
import {styles} from "@/lib/pdfCreator/templates/workshop/ticket/WorkshopTicketStyling";
import {generateTicketQRCode} from "@/lib/qrcode/generate";


type WorkshopTicketPdfProps = {
    workshopName: string;
    date: string;
    time: string;
    location: string;
    bookedBy: string;
    ticketNumber: string;
    format: string
    workshopId: string
};


const WorkshopTicketPdf = ({
                               workshopName,
                               date,
                               time,
                               location,
                               bookedBy,
                               ticketNumber,
                               format,
                               workshopId
                           }: WorkshopTicketPdfProps) => {


    const [qrCode, setQRCode] = React.useState<string>("");
    useEffect(() => {
        generateTicketQRCode(workshopId, ticketNumber).then(data => setQRCode(data.qr))
    })
    return <Document>
        <Page size="A4" orientation="landscape" style={ styles.page }>
            <View style={ styles.pageContent }>
                <View style={ styles.ticketWrapper }>
                    <View style={ styles.brandArea }>
                        <View>
                            <Text style={ styles.brandLabel }>Ticket</Text>
                            {/* eslint-disable-next-line jsx-a11y/alt-text */ }
                            <Image src={ logo.src } style={ styles.logo }/>

                        </View>

                        <Text style={ styles.brandSubline }>
                            Bitte dieses Ticket zum Workshop mitbringen.
                        </Text>
                    </View>

                    <View style={ styles.infoArea }>
                        <View>
                            <View style={ styles.headerRow }>
                                <View style={ styles.workshopTitleBlock }>
                                    <Text style={ styles.eyebrow }>{ format.toUpperCase() }</Text>
                                    <Text style={ styles.workshopTitle }>{ workshopName }</Text>
                                </View>

                                <View style={ styles.ticketBadge }>
                                    <Text style={ styles.ticketBadgeLabel }>Ticket-Nr.</Text>
                                    <Text style={ styles.ticketBadgeNumber }>{ ticketNumber }</Text>
                                </View>
                            </View>
                            <View style={ styles.divider }/>

                            <View style={ styles.detailsGrid }>
                                <View style={ styles.detailItem }>
                                    <Text style={ styles.detailLabel }>Datum</Text>
                                    <Text style={ styles.detailValue }>{ date }</Text>
                                    <Text style={ styles.spacer }/>
                                    <Text style={ [styles.detailLabel, {marginTop: 10}] }>Uhrzeit</Text>
                                    <Text style={ styles.detailValue }>{ time }</Text>
                                </View>

                                <View style={ styles.detailItem }>
                                    <Text style={ styles.detailLabel }>Location</Text>
                                    <Text style={ styles.detailValue }>{ location }</Text>
                                    <Text style={ styles.spacer }/>
                                    <Text style={ [styles.detailLabel, {marginTop: 10}] }>Buchende Person</Text>
                                    <Text style={ styles.detailValue }>{ bookedBy }</Text>
                                </View>

                                <View style={ styles.qrItem }>
                                    <View style={ styles.qrBox }>
                                        {/* eslint-disable-next-line jsx-a11y/alt-text */ }
                                        <Image src={ qrCode } style={ styles.qrCode }/>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={ styles.footer }>
                            <Text style={ styles.footerText }>
                                Dieses Ticket ist personalisiert und nur für die angegebene Buchung gültig.
                            </Text>
                            <Link src="https://www.sensibar-coaching.de/widerrufsbelehrung" style={ styles.footerText }>
                                https://www.sensibar-coaching.de/widerrufsbelehrung
                            </Link>
                        </View>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
}

export default WorkshopTicketPdf;