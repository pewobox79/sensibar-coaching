'use client'

import {useSearchParams} from "next/navigation";
import {useEffect} from "react";

const DoubleOptInPage = () => {

    const searchParams = useSearchParams()
    const id = searchParams ? searchParams.get("id") : "";
    const type = searchParams ? searchParams.get("type") : "";

    useEffect(() => {

            fetch("/api/db/participant", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: id}),
            }).then(response => response.json())
                .then(data => console.log("updated", data))
        },
        [id]
    )
    return <>
        <h3>Deine Anmeldung zu meinen { type }. </h3>
        <p>Ich freue mich über Dein Kommen.</p>
        <p>Du bekommst alle nötigen Informationen in den nächsten Minuten per Email</p>

        <p>Gruß Yessica</p>
    </>
}

export default DoubleOptInPage;