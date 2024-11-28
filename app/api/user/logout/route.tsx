import {cookies} from "next/headers";

export async function POST() {
    const cookieStore = await cookies()

    await cookieStore.delete("sensiToken")

    return Response.json({msg: "logout successful"})


}