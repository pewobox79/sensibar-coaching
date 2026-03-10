'use client'
import styles from '@/styles/CheckoutElements.module.css'
import PayPalBtn from "@/components/PayPal/PayPalBtn";
import {PayPalProvider} from "@paypal/react-paypal-js/sdk-v6";
import {useSearchParams} from "next/navigation";
import {useOrderStore} from "@/stores/useOrderStore";
import Link from "next/link";

const Overview = () => {

    const search = useSearchParams()
    const {value} = useOrderStore()

    console.log("params", search.get("name"))
    console.log("orderpage",value)


    return <>
        <div className={ styles.checkoutTable }>
            <div className={ styles.checkoutTableHeader }>
                <h2>Deine Ticketbestellung</h2>
            </div>
            <div className={ styles.checkoutTableBody }>
             <p>{value.eventFormat}: {value.eventName}</p>
                <p>Datum: {value.eventDate}</p>
                <p>Ort: {value.eventLocation.city}</p>
                <p>Preis: {value?.price ||"tbd"}</p>
            </div>
            <div className={ styles.checkoutTableFooter }>
                <Link className="globalTextLink" href="/widerrufsbelehrung" target={"_blank"}>Widerrufsbelehrung</Link>
            </div>
        </div>

        <PayPalProvider clientId={ "09809" }>
            <PayPalBtn/>
        </PayPalProvider>
    </>
}

export default Overview