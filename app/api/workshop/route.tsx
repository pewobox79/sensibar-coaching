import {NextRequest} from "next/server";

import {sendWorkshopCancelEmail} from "@/utils/helper/mailingHelper";

export async function POST(req: NextRequest) {

    const body = await req.json();

    const response = await sendWorkshopCancelEmail(body.emails, body.workshopName, body.workshopDate);

    return Response.json({msg: "email successfully sent", response})


}
