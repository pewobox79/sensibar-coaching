'use client'
import {approvePaypalPayment, createPayment} from "@/lib/strapi/orderHelper";
import {useOrderStore} from "@/stores/useOrderStore";
import {PayPalButtons} from "@paypal/react-paypal-js";
import {OnApproveData} from "@paypal/paypal-js";
import {useState} from "react";
import ToastMessage from "@/components/global/ToastMessage";
import EmailInfo from "@/components/global/EmailInfo";
import {useRouter} from "next/navigation";
import {sendMailingAfterRegistration} from "@/utils/helper/proxyHelper/sendMailing";
import {handlePaymentCancel} from "@/lib/strapi/paymentHelper";

const PayPalBtn = ({enabled, paymentId}: { enabled: boolean, price: number, orderId: string, paymentId: string }) => {

        const {value, resetOrderData} = useOrderStore()
        const router = useRouter();
        const [success, setSuccess] = useState({msg: "", state: false, type: ""})
        const [emailInfo, setEmailInfo] = useState(false)
        const [error, setError] = useState({
            msg: "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später noch einmal",
            state: false,
            type: "error"
        })

        async function handleCancel() {
            await handlePaymentCancel(paymentId, value.ticketId, resetOrderData, router)
        }

        async function handleError() {
            setError({...error, state: true})
            setTimeout(() => {

                handlePaymentCancel(paymentId, value.ticketId, resetOrderData, router)
            }, 2000)


        }

        async function handleOnApprove(data: OnApproveData) {

            const approved = await approvePaypalPayment(paymentId, data, value)

            if (approved.paypalRes?.status === "COMPLETED" && approved?.strapiRes?.msg.includes("success")) {
                setSuccess({state: true, msg: "Payment successful", type: "success"})
                setEmailInfo(true)
                await sendMailingAfterRegistration(value.clientId, value.contactEmail, value.eventName, value.workshopId, paymentId)
                setTimeout(() => {
                    router.push("/selbsttest")
                }, 3000)
            } else {
                console.log("failed status", approved.paypalRes?.status)
                setSuccess({state: true, msg: "Payment failed", type: "error"})
            }
        }

        if (emailInfo) {
            return <EmailInfo setEmailInfo={ setEmailInfo }/>
        }


        return <div
            style={ {
                pointerEvents: enabled ? "auto" : "none",
                opacity: enabled ? 1 : 0.5
            } }
        >{ !emailInfo && <PayPalButtons
          createOrder={ async () => {
              return await createPayment(value)
          } }
          onApprove={ handleOnApprove }
          onError={ handleError }
          onCancel={ handleCancel }
        /> }
            <ToastMessage state={ success } setState={ setSuccess }/>
            <ToastMessage state={ error } setState={ setError }/>
        </div>
    }
;

export default PayPalBtn;