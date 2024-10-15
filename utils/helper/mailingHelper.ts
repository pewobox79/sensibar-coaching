import nodemailer from 'nodemailer';

const password = process.env.NEXT_PUBLIC_EMAIL_DOI_PW
export const transporter = nodemailer.createTransport({
    host: "smtps.udag.de",
    port: 587,
    secure: false,
    auth: {
        user: "sensibar-coaching-de-0004",
        pass: password
    },
    dkim:{
        domainName: "sensibar-coaching.de",
        keySelector: "dkim-2024",
        privateKey: process.env.NEXT_PUBLIC_DKIM_PUBLIC_KEY,
    }
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function sendSubmissionEmail(userId, email) {
console.log("data for sending", userId, email)
    const info = await transporter.sendMail({
        from: 'Maddison Foo Koch', // sender address
        to: `${email}`, // list of receivers
        envelope:{
            from: 'Yessica Wolf',
            to:`${email}`
        },
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<div>Danke für Deine Anmeldung. Bitte schließe Deine Anmeldung ab, um Deinen Platz zu sichern.<br/><a href={\`/https://www.webdeveloper-peterwolf.com/${ userId }\`}><h3>Anmeldung abschließen</h3></a> </div>`, // html body
    });

    console.log("message send", info)
}