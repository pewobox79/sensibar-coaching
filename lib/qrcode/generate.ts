import {SENSIBAR_URL} from "@/utils/variables";

export const generateTicketQRCode = async (workshopId= 12324, ticketId= 134234) => {

    const url = `${ SENSIBAR_URL }/api/qrcode`;

    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({workshopId, ticketId})
    }
    try {

        const response = await fetch(url, config)
        if (!response.ok) {
            throw new Error(`Failed to generate QR code`);
        }

        return await response.json();

    } catch (err) {
        throw new Error(`Failed to generate QR Code: ${ err }`);
    }
}