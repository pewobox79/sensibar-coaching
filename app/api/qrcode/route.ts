import QRCode from 'qrcode';
export async function POST(req: Request) {

    const body = await req.json();
    const {workshopId, ticketId} = body;
    const url = `https://example.com?workshopId=${workshopId}&ticketId=${ticketId}`;

    const qr = await QRCode.toDataURL(url);

    return new Response(JSON.stringify({ qr }));
}