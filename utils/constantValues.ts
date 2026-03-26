export const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "Paypal";
export const PAYPAL_SECRET_KEY = process.env.NEXT_PUBLIC_PAYPAL_APP_SECRET ||"";
export const PAYPAL_API_URL = process.env.NEXT_PUBLIC_PAYPAL_API_URL ||"https://paypal.me";

export const PAYPAL_ENV = process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT || "sandbox";


//Strapi

export const STRAPI_URI = process.env.NEXT_PUBLIC_STRAPI_URL_DEV
export const FRONTEND_URI = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'
export const BEARER_TOKEN = process.env.NEXT_PUBLIC_STRAPI_BEARER_TOKEN || ""