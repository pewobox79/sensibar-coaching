import { OrderTypes} from "@/types/generalTypes";
import {paypalFunctions} from "@/lib/paypal/functions";
import { updatePaymentInStrapi} from "@/lib/strapi/paymentHelper";
import {OnApproveData} from "@paypal/paypal-js";

export const createPayment = async (value: OrderTypes) => {

    const {ticketPrice} = value

    const payPalPayment: { id: string, status: string } = await paypalFunctions.createOrder(Number(ticketPrice))
    return payPalPayment.id

}

export const approvePaypalPayment = async (paymentId:string, data:OnApproveData, storeValues:OrderTypes) => {
    let updateRes
    const paymentRes = await paypalFunctions.createPayment(data.orderID)
    if(paymentRes){
        updateRes = await updatePaymentInStrapi(paymentId, storeValues, paymentRes as unknown as {id: string, status: string, payer: {payer_id: string}})
    }

    return { paypalRes: paymentRes, strapiRes: updateRes}


}