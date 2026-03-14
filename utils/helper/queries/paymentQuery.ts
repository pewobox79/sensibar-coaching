import qs from "qs";

export const PaymentQuery = qs.stringify({
    populate: {
        transaction: {
            fields: ['transactionId', 'transactionState']
        },
        event_ticket:{
            fields: ['documentId']
        }
    }
}, {
    encodeValuesOnly: true
})