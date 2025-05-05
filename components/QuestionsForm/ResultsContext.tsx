'use client'
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {getTestResultsByHighestValue} from "@/lib/strapi/generalHelper";
import {useEffect, useState} from "react";
import RenderContentHelper from "@/components/strapi/RenderContentHelper";

const ResultsContext = ({value}:{value: string }) => {

    const token = useLocalStorage("sensiUser")?.value;
    const [context, setContext] = useState<{title:string, description: []}>({title: "", description: []})

    useEffect(() => {
        getTestResultsByHighestValue(token?.jwt, Number(value)).then(res => {
            setContext({...context, title: res.data[0].title, description: res.data[0]?.description})

        })
    }, []);


    return <div>

        <h2>{ context.title }</h2>
        <RenderContentHelper blocks={ context?.description ? context?.description : [] }/>
    </div>
}

export default ResultsContext