import {NextRequest} from "next/server";
import {sendContactFormEmail} from "@/utils/helper/mailingHelper";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const response = await sendContactFormEmail(body)
    return Response.json({msg: "sending mail response", response})

}