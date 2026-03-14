'use client'
import {approvePaypalPayment, createPayment} from "@/lib/strapi/orderHelper";
import {useOrderStore} from "@/stores/useOrderStore";
import {PayPalButtons} from "@paypal/react-paypal-js";
import {useSearchParams} from "next/navigation";
import {OnApproveData} from "@paypal/paypal-js";

const PayPalBtn = ({enabled}: { enabled: boolean, price: number, orderId: string }) => {

    const {value} = useOrderStore()
    const search = useSearchParams()
    const paymentId = search.get("pid") ||""
    async function handleOnApprove (data:OnApproveData){

        const approved = await approvePaypalPayment(paymentId, data, value)
        console.log("final note",approved)

    }

    return <div
        style={ {
            pointerEvents: enabled ? "auto" : "none",
            opacity: enabled ? 1 : 0.5
        } }
    ><PayPalButtons
        createOrder={ async () => {
          return await createPayment(value)
        } }
        onApprove={handleOnApprove}
    /></div>
};

export default PayPalBtn;