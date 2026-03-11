'use client'
import {
    PayPalOneTimePaymentButton,
} from "@paypal/react-paypal-js/sdk-v6";

const PayPalBtn = ({enabled}:{enabled: boolean}    ) => {

    return <div
        style={ {
            pointerEvents: enabled ? "auto" : "none",
            opacity: enabled ? 1 : 0.5
        } }
    ><PayPalOneTimePaymentButton
        createOrder={ async () => {
            const res = await fetch("/api/orders", {method: "POST"});
            const order = await res.json();
            return {orderId: order.id};
        } }
        onApprove={ async ({orderId}) => {
            await fetch(`/api/orders/${ orderId }/capture`, {method: "POST"});
        } }
    /></div>
};

export default PayPalBtn;