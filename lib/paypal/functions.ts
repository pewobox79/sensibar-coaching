import {PAYPAL_CLIENT_ID, PAYPAL_ENV, PAYPAL_SECRET_KEY} from "@/utils/constantValues";

const endpoint_url = PAYPAL_ENV === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';
export const generatePayPalAccessToken = async (): Promise<void> => {

    const auth = `${ PAYPAL_CLIENT_ID }:${ PAYPAL_SECRET_KEY }`
    const data = 'grant_type=client_credentials'
    const response = await fetch(endpoint_url + '/v1/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${ Buffer.from(auth).toString('base64') }`
        },
        body: data
    })

    const jsonData = await handleResponse(response)
    return jsonData.access_token;


}


async function handleResponse(response: Response) {

    if (!response.ok) {
        const error = await response.text()
        throw new Error(error);
    }
    return await response.json();
}


export const paypalFunctions = {
    createOrder: async (price: number): Promise<{ id:string, status: string,links:[] }> => {
        const accessToken = await generatePayPalAccessToken()

        console.log("accessToken", accessToken)

        const data = {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: price,
                }
            }]
        }
console.log("submit data", data)
        const response = await fetch(endpoint_url + '/v2/checkout/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ accessToken }`
            },
            body: JSON.stringify(data)
        })
        return await handleResponse(response)


    },
    createPayment: async (orderId: string): Promise<void> => {

        const accessToken = await generatePayPalAccessToken()

        const response = await fetch(`${endpoint_url}/v2/checkout/orders/${orderId}/capture`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            return await handleResponse(response)

    }
}