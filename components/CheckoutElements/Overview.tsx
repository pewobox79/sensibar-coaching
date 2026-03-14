'use client'
import styles from '@/styles/CheckoutElements.module.css'
import PayPalBtn from "@/components/PayPal/PayPalBtn";
import {PayPalProvider} from "@paypal/react-paypal-js/sdk-v6";
import {useSearchParams} from "next/navigation";
import {useOrderStore} from "@/stores/useOrderStore";
import Link from "next/link";
import {formatIsoDateToGerman, formatPrice} from "@/utils/helper/formater";
import BillingAddress from "@/components/forms/BillingAddress/BillingAddress";
import {PAYPAL_CLIENT_ID} from "@/utils/constantValues";
import EmailInfo from "@/components/global/EmailInfo";
import Button from "@/components/global/Button";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";

const Overview = () => {

    const search = useSearchParams()
    const {value, handleWithdrawal, updateBillingState} = useOrderStore()

    console.log("params", search.get("name"))
    console.log("orderpage", value)

    const speakerNameList = value?.speaker?.map((speaker)=>speaker.name) || []
    const netPrice = value?.ticketPrice * (1-0.19)
    return <>
        <div className={ styles.checkoutTable }>
            <div className={ styles.checkoutTableHeader }>
                <h2>Deine Ticketbestellung - { value.eventFormat || "Workshop" }</h2>
            </div>
            <div className={ styles.checkoutTableBody }>
                <h4>{ value.eventName || "Test name" }</h4>
                <div className={ styles.checkoutTableInner }>
                    <div className={ styles.checkoutTableInnerDescription }>
                        <p>Datum: { formatIsoDateToGerman(value.eventDate) }</p>
                        <p>Ort: { value.eventLocation.city }</p>
                        <p>Referent: { speakerNameList.join(', ') || '' }</p>
                    </div>
                    <div className={ styles.checkoutTablePrice }>
                        <div className={ styles.checkoutTablePriceDetail }>
                            <p>Einzelpreis: </p>
                            <p>{ formatPrice(netPrice) } </p>
                        </div>
                        <div className={ styles.checkoutTablePriceDetail }>
                            <p>MwSt: 19% </p>
                            <p>{ formatPrice(value.ticketPrice-netPrice) }</p>
                        </div>
                        <div className={ styles.checkoutTablePriceDetail }>
                            <p className={ styles.checkoutTableFinalPrice }>Endpreis:</p>
                            <p className={ styles.checkoutTableFinalPrice }>{ formatPrice(value.ticketPrice)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className={ styles.checkoutTableFooter }>
            <input id="rechnungsaddresse" type="checkbox" checked={ value?.billing }
                   onChange={ updateBillingState }/>
            <label htmlFor="rechnungsaddresse" style={ {fontSize: "1rem"} }>Ich möchte eine Rechnung haben</label>
        </div>
        {value.billing && (<BillingAddress/>)}
        <div className={ styles.checkoutTableFooter }>
            <input id="widerrufsbelehrung" type="checkbox" checked={ value?.rightOfWithdrawal?.hasAccepted }
                   onChange={ handleWithdrawal }/>
            <label htmlFor="widerrufsbelehrung" style={ {fontSize: "1rem"} }>Ich habe die <Link
                style={ {fontSize: "1rem"} } className="globalTextLink" href="/widerrufsbelehrung"
                target={ "_blank" }>Widerrufsbelehrung</Link>gelesen und akzeptiere diese.</label>
        </div>

        <div className={ styles.checkoutTableButtons }>
            <PayPalScriptProvider options={{
                clientId: PAYPAL_CLIENT_ID,
                currency: "EUR",
                intent: "capture",
                "disable-funding": "card,bancontact,sepa,eps,giropay,ideal,p24,sofort"
            }}>
                <PayPalBtn enabled={ value?.rightOfWithdrawal?.hasAccepted } price={Number(value?.ticketPrice)} orderId={value.ticketId}/>
            </PayPalScriptProvider>

            <Button type={"button"} title={"Abbrechen"} href={"/workshops"} />
        </div>
    </>
}

export default Overview