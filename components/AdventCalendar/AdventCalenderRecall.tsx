'use client'
import Container from "@/components/global/Container";
import {useSearchParams} from "next/navigation";
import Button from "@/components/global/Button";
import ToastMessage from "@/components/global/ToastMessage";
import {useState} from "react";
import {removeAdventsSubscription} from "@/lib/strapi/generalHelper";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {LOCAL_STORAGE_KEY_ADVENT_SUBSCRIPTION} from "@/components/AdventCalendar/AdventCalenderSubscription";
import SternElement from "@/components/global/SternElement";

const AdventCalendarRecall = () => {

    const params = useSearchParams();
    const subscriberId = params.get('sid')

    const [success, setSuccess] = useState({state: false, msg: "", type: "success"})
    const [error, setError] = useState({state: false, msg: "", type: "error"})
    const {deleteLocalStorage} = useLocalStorage(LOCAL_STORAGE_KEY_ADVENT_SUBSCRIPTION, null)
    async function handleRecall(id:string){

       try{
           const response = await removeAdventsSubscription(id)
           if(response.msg !== "Ihre Abmeldung ist fehlgeschlagen"){
               setSuccess({state: true, msg: response.msg, type: "success"})
               deleteLocalStorage()
               return
           } else {
               setError({state: true, msg: response.msg, type: "error"})
               return
           }
       } catch(err){
           setError({state: true, msg: "Remove of Subscriber failed", type: "error"})
       }

    }
    return <Container id={"recall"}>
        <div className={"text"}>
            <SternElement bgColor={"#f0dfd3"}/>
            <h1>Abmelden von Adventskalender</h1>
            <p>Falls Sie keine Kalender - Erinnerungen während der Adventszeit mehr erhalten möchten, können Sie sich abmelden.</p>
            <Button type={"submit"} action={() => handleRecall(String(subscriberId))} title={"Abmelden"}/>
        </div>

        { success.state && <ToastMessage state={ success } setState={ setSuccess }/> }
        { error.state && <ToastMessage state={ error } setState={ setError }/> }

    </Container>
}

export default AdventCalendarRecall