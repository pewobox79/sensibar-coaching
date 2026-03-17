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

const PayPalBtn = ({enabled, paymentId}: { enabled: boolean, price: number, orderId: string, paymentId: string }) => {

        const {value} = useOrderStore()
        const router = useRouter();
        const [success, setSuccess] = useState({msg: "", state: false, type: ""})
        const [emailInfo, setEmailInfo] = useState(false)
        async function handleOnApprove(data: OnApproveData) {

            const approved = await approvePaypalPayment(paymentId, data, value)

            if (approved.paypalRes?.status === "COMPLETED" && approved?.strapiRes?.msg.includes("success")) {
                setSuccess({state: true, msg: "Payment successful", type: "success"})
                setEmailInfo(true)
                await sendMailingAfterRegistration(value.clientId, value.contactEmail, value.eventName, value.workshopId)
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
        /> }
            <ToastMessage state={ success } setState={ setSuccess }/>
        </div>
    }
;

export default PayPalBtn;