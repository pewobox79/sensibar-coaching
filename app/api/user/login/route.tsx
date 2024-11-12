import {NextRequest} from "next/server";
import {userLoginRequest} from "@/lib/strapi/userHelper";
import {cookies} from 'next/headers'

export async function POST(req: NextRequest) {
    const cookieStore = await cookies()
    const body = await req.json();

    const {identifier, password} = body;

    const response = await userLoginRequest(identifier, password)
    await cookieStore.set("sensiToken", response.jwt)

    return Response.json(response)


}