import nodemailer from 'nodemailer';
import SMTPTransport from "nodemailer/lib/smtp-transport";

const password = process.env.NEXT_PUBLIC_G_APP_PASSWORD
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "sensibardonnotreply@gmail.com",
        pass: password
    },
    dkim:{
        domainName: "sensibar-coaching.de",
        keySelector: "1728995224.coaching",
        privateKey: process.env.NEXT_PUBLIC_DKIM_PUBLIC_KEY,
    }
} as SMTPTransport.Options)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function sendSubmissionEmail(userId:string, email:string) {

    try {
        const info = await transporter.sendMail({
            to: `${ email }`, // list of receivers
            subject: "Deine Workshop Registrierung", // Subject line
            text: `Danke für Deine Anmeldung. Bitte schließe Deine Anmeldung ab, um Deinen Platz zu sichern. https://www.sensibar-coaching.de/rueckmeldungen/doubleOptIn?id=${userId}`, // plain text body
            //html: `<div>Danke für Deine Anmeldung. Bitte schließe Deine Anmeldung ab, um Deinen Platz zu sichern.<br/><a href={"https://www.webdeveloper-peterwolf.com/${userId}"} target="_blank"><h3>Anmeldung abschließen</h3></a> </div>`, // html body
        })

        return {msg: "email sucessfully sent", info}
    }catch (e) {
        return ({msg:"error sending email", error:e})
    }
}



export async function sendRegistrationFinalEmail(userId:string, email:string, name:string) {

    try {
        const info = await transporter.sendMail({
            to: `${ email }`, // list of receivers
            subject: "Dein Platz ist gesichert!", // Subject line

            html: `<div>Hallo ${name}, <br/>Ich habe Dir Deinen Platz gesichert. <br/><p>Gruß Yessica</p><p>Sensibar-Coaching<br/>Lindenstrasse 6a<br/>85309 Pörnbach</p></div>`, // html body
        })

        return {msg: "email sucessfully sent", info}
    }catch (e) {
        return ({msg:"error sending email", error:e})
    }
}