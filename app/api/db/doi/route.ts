import {NextRequest} from "next/server";
import {sendRegistrationFinalEmail} from "@/utils/helper/mailingHelper";

export async function POST(req: NextRequest) {

    const body = await req.json();

    const response = await sendRegistrationFinalEmail(body.id, body.email, body.name);
    return Response.json({msg: "sending mail response", response})


}