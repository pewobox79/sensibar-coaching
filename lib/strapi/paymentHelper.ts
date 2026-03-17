import {BEARER_TOKEN, STRAPI_URI} from "@/utils/constantValues";
import {PaymentQuery} from "@/utils/helper/queries/paymentQuery";
import {OrderTypes} from "@/types/generalTypes";

export const createNewPaymentInStrapi = async (ticketId: string) => {
    const paymentData = {
        event_ticket: ticketId
    }
    const config = {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            Authorization: `Bearer ${ BEARER_TOKEN }`,
        },
        body: JSON.stringify({data: {...paymentData}}),
    }
    try {
        const response = await fetch(`${ STRAPI_URI }/api/payments?${ PaymentQuery }`, config)
        const data = await response.json()
        return data.data
    } catch (e) {

        console.error('Error fetching basic page content:', e)
    }
}

export const getSinglePayment = async (paymentId: string) => {
    const payment = await fetch(`${ STRAPI_URI }/api/payments/${ paymentId }`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${ process.env.NEXT_PUBLIC_STRAPI_BEARER_TOKEN }`
        }, next: {revalidate: 10}
    })

    return await payment.json()
}

export const updatePaymentInStrapi = async (paymentId: string, storedValue: OrderTypes, paymentRes: {
    id: string,
    status: string,
    payer: { payer_id: string }
}) => {
    const {clientId, billingAddress, billing, transaction, rightOfWithdrawal} = storedValue

    const dataToSubmit = {
        withBilling: {
            contact: clientId,
            transaction: {
                ...transaction,
                transactionId: paymentRes?.id || "",
                transactionState: paymentRes?.status,
                payerId: paymentRes?.payer.payer_id,
                transactionDate: new Date
            },
            billing,
            rightOfWithdrawal,
            billingAddress
        },
        noBilling: {
            contact: clientId,
            transaction: {
                ...transaction,
                transactionId: paymentRes?.id || "",
                transactionState: paymentRes?.status,
                payerId: paymentRes?.payer.payer_id,
                transactionDate: new Date
            },
            rightOfWithdrawal,
        }
    }

    const checkDataToSubmit = billing ? dataToSubmit.withBilling : dataToSubmit.noBilling

    const paymentUpdateRes = await fetch(`${ STRAPI_URI }/api/payments/${ paymentId }`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${ process.env.NEXT_PUBLIC_STRAPI_BEARER_TOKEN }`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({data: {...checkDataToSubmit}}),
    })

    return {msg: "payment updated successfully", paymentUpdateRes}
}

export const deletePayment = async (paymentId: string) => {
    try {
       await fetch(`${ STRAPI_URI }/api/payments/${ paymentId }`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${ process.env.NEXT_PUBLIC_STRAPI_BEARER_TOKEN }`
            }
        })

        return {msg: "payment deleted successfully"}
    } catch (e) {
        console.error("error delete payment", e)
        return {msg: "error deleting payment details"}
    }
}
