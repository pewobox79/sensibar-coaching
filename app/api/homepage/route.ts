import {getHomepage} from "@/lib/strapi/generalHelper";

export async function GET() {

    try{
        const response = await getHomepage()
        console.log("res", response)
        return Response.json({msg: "sending mail response", response})
    }catch(err){

        return Response.json({msg: "failed to fetch data", err})
    }



}