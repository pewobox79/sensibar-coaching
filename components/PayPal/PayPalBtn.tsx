'use client'
import {
    OnApproveDataOneTimePayments,
    PayPalOneTimePaymentButton,
} from "@paypal/react-paypal-js/sdk-v6";

const PayPalBtn = ({enabled}:{enabled: boolean}    ) => {
    return <div
        style={ {
            pointerEvents: enabled ? "auto" : "none",
            opacity: enabled ? 1 : 0.5
        } }
    ><PayPalOneTimePaymentButton
        presentationMode="popup"
        createOrder={async () => {
            const response = await fetch("/api/create-order", {
                method: "POST",
            });
            const { orderId } = await response.json();
            return { orderId };
        }}
        onApprove={async ({ orderId }: OnApproveDataOneTimePayments) => {
            await fetch(`/api/capture-order/${orderId}`, {
                method: "POST",
            });
            console.log("Payment captured!");
        }}
    /></div>
};

export default PayPalBtn;