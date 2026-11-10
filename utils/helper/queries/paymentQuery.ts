import qs from "qs";

export const PaymentQuery = qs.stringify({
    populate: {
        transaction: {
            fields: ['transactionId', 'transactionState', 'provider']
        },
        billingAddress: true,
        event_ticket: {
            populate:{
                workshop:{
                    fields: ['title', 'workshop_date', 'workshopTimeStart', 'workshopTimeEnd', 'format', 'workshopPrice', "type"],
                    populate:{
                        location:true
                    }
                }
            }
        },
        contact: {
            populate: {
                personalData: {
                    fields: ['firstname', 'lastname']
                }
            }
        },
    }
}, {
    encodeValuesOnly: true
})