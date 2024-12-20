import {NextRequest} from "next/server";

import {sendRegistrationFinalEmail, sendSubmissionEmail} from "@/utils/helper/mailingHelper";

export async function POST(req: NextRequest) {

    const body = await req.json();

    const response = await sendSubmissionEmail(body.id, body.email, body.workshopName, body.workshopId);
    return Response.json({msg: "sending mail response", response})


}


export async function PUT(req: NextRequest) {

    const body = await req.json();

    const updatedUser = await sendRegistrationFinalEmail(body.id, body.email, body.name, body.workshopLink, body.workshopDate, body.title)

    return Response.json({msg: "user updated", updatedUser})

}