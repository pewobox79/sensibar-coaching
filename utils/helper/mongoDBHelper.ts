import Participant from "@/lib/db/models/ParticipantsModel";

export const handleDoubleOptIn = async (id:string)=>{


    const participant = await Participant.updateOne({_id:id,
    gdpr: false},
    {$set: {gdpr: true}})

    if(!participant){
        throw new Error("Failed to update participant")
    }

    return participant;

}