import {NextRequest} from "next/server";
import {sendAdventCalendarSubscriptionEmail} from "@/utils/helper/mailingHelper";

export async function POST(req: NextRequest) {

    const body = await req.json();
    const response = await sendAdventCalendarSubscriptionEmail({
        email: body.email,
        sid: body.sid,
    });
    return Response.json({msg: "sending mail response", response})


}
