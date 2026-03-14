'use client'
import {approvePaypalPayment, createPayment} from "@/lib/strapi/orderHelper";
import {useOrderStore} from "@/stores/useOrderStore";
import {PayPalButtons} from "@paypal/react-paypal-js";
import {useSearchParams} from "next/navigation";
import {OnApproveData} from "@paypal/paypal-js";
import {useState} from "react";
import ToastMessage from "@/components/global/ToastMessage";


const PayPalBtn = ({enabled}: { enabled: boolean, price: number, orderId: string }) => {

    const {value} = useOrderStore()
    const search = useSearchParams()
    const paymentId = search.get("pid") ||""

    const [success, setSuccess]=useState({ msg: "", state: false, type:"" })
    async function handleOnApprove (data:OnApproveData){

        const approved = await approvePaypalPayment(paymentId, data, value)

        if(approved.paypalRes?.status === "COMPLETED" && approved?.strapiRes?.msg.includes("success")){

            setSuccess({state: true, msg: "Payment successful", type:"success"})

        }else{
            setSuccess({state: true, msg: "Payment failed", type:"error"})
        }
    }

    if(success.state){

        return <ToastMessage state={success} setState={setSuccess} />
    }
    return <div
        style={ {
            pointerEvents: enabled ? "auto" : "none",
            opacity: enabled ? 1 : 0.5
        } }
    >{!success.state && <PayPalButtons
        createOrder={ async () => {
          return await createPayment(value)
        } }
        onApprove={handleOnApprove}
    />}
    </div>
};

export default PayPalBtn;