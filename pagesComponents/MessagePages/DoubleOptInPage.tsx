'use client'

import {useSearchParams} from "next/navigation";
import {useEffect} from "react";
import {executeDoubleOptIn, getSingleWorkshop} from "@/lib/strapi/workshopHelper";

const DoubleOptInPage = () => {

    const searchParams = useSearchParams()
    const id = searchParams ? searchParams.get("id") : "";
    const workshopId = searchParams ? searchParams.get("wsId") : "";

    useEffect(() => {
        getSingleWorkshop(workshopId).then((data)=>{

            const workshopLink = data.data?.link?.href;
            const {title, workshop_date} = data?.data

            executeDoubleOptIn(id, workshopLink, title, workshop_date).then(data => console.log(data));
        })


        },
        [id]
    )
    return <div className={"innerWrapper"}>
        <h3>Deine Anmeldung zu meinen Workshop. </h3>
        <p>Ich freue mich über Dein Kommen.</p>
        <p>Du bekommst alle nötigen Informationen in den nächsten Minuten per Email</p>

        <p>Gruß Yessica</p>
    </div>
}

export default DoubleOptInPage;