'use client'

import {useSearchParams} from "next/navigation";

const DoubleOptInPage =({params})=>{
console.log("params: " + params)

    const searchParams = useSearchParams()
    const id=searchParams.get("id")

    const type = searchParams.get("type")
    console.log(id)
    return <>
        <h3>Deine Anmeldung zu meinen {type}. </h3>
        <p>Ich freue mich über Dein Kommen.</p>
        <p>Du bekommst alle nötigen Informationen in den nächsten Minuten per Email</p>

        <p>Gruß Yessica</p>
    </>
}

export default DoubleOptInPage;