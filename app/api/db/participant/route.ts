import {connectMongoDB} from "@/utils/db/mongodb";
import {NextRequest} from "next/server";
import Participant from "@/lib/db/models/ParticipantsModel";
import {handleDoubleOptIn} from "@/utils/helper/mongoDBHelper";
import {sendSubmissionEmail} from "@/utils/helper/mailingHelper";

export async function POST(req: NextRequest) {

    // Connect to MongoDB
    const body = await req.json();
    const {firstname, lastname, contact, gdpr, condition} = body;
    try {


        const connection = await connectMongoDB();

        if (connection) {
            const existing = await Participant.exists({
                firstname,
                lastname,

            })

            if (existing) {

                console.log("existing participant ")
                return Response.json({msg: "Participant already exists"});
            }

            // Create and save a new user in the database
            const newParticipant = await Participant.create({
                firstname: firstname,
                lastname: lastname,
                contact: {
                    email: contact?.email,
                    phone: contact?.phone
                },
                gdpr: gdpr,
                condition:condition
            });

            if (!newParticipant) {

                console.log("participant failed")
            }
            await sendSubmissionEmail(newParticipant?._id, contact?.email)
            return Response.json({msg: "added participant"});

        } else {

            console.log("connection not ready")
        }
    } catch (error) {
        return Response.json({message: 'Error creating user', error});
    }


}



export async function PUT(req: NextRequest){

    const body = await req.json()
    const updatedUser = await handleDoubleOptIn(body.id)
    return Response.json({msg:"user updated", updatedUser})

}