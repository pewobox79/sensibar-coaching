import QRCode from 'qrcode';
import {SENSIBAR_URL} from "@/utils/variables";
export async function POST(req: Request) {

    const body = await req.json();
    const {workshopId, ticketId} = body;
    console.log(workshopId, ticketId)
    const url = `${ SENSIBAR_URL }?workshopId=${workshopId}&ticketId=${ticketId}`;

    const qr = await QRCode.toDataURL(url);

    return new Response(JSON.stringify({ qr }));
}