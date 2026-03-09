'use client'
import {
    usePayPal,
    PayPalOneTimePaymentButton,
} from "@paypal/react-paypal-js/sdk-v6";

const PayPalBtn = () => {

    const {loadingStatus, error} =usePayPal()

    if(loadingStatus === 'pending'){
        return <div>Loading PayPal...</div>
    }

    if(error){
        return <div>Error loading PayPal: {error.message}</div>
    }
  return <PayPalOneTimePaymentButton
              createOrder={async () => {
                  const res = await fetch("/api/orders", { method: "POST" });
                  const order = await res.json();
                  return { orderId: order.id };
              }}
              onApprove={async ({ orderId }) => {
                  await fetch(`/api/orders/${orderId}/capture`, { method: "POST" });
              }}
          />
};

export default PayPalBtn;