import {connectMongoDB} from "@/utils/db/mongodb";
import {NextRequest} from "next/server";
import Participant from "@/lib/db/models/ParticipantsModel";

export async function POST(req: NextRequest) {

    // Connect to MongoDB
    const body = await req.json();
    const {firstname, lastname, contact, gdpr, condition} = body;
    console.log("body", contact)
    try {


        const connection = await connectMongoDB();

        if (connection) {
            console.log("connection", connection)
            const existing = await Participant.exists({
                firstname,
                lastname,

            })

            if (existing) {

                console.log("existing participant ")
                return Response.json({msg: "Participant already exists"});
            }
            console.log("existing", existing)

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
            console.log("participant", newParticipant)
            return Response.json({msg: "added participant"});

        } else {

            console.log("connection not ready")
        }
    } catch (error) {
        return Response.json({message: 'Error creating user', error});
    }


}