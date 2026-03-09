'use client'
import {
    PayPalOneTimePaymentButton,
} from "@paypal/react-paypal-js/sdk-v6";

const PayPalBtn = () => {

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