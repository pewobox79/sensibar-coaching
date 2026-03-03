import {getHomepage} from "@/lib/strapi/generalHelper";

export async function GET() {

    try{
        const response = await getHomepage()
        return Response.json({msg: "successfull homepage data response", response})
    }catch(err){

        return Response.json({msg: "failed to fetch data", err})
    }



}