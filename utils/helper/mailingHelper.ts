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
    dkim: {
        domainName: "sensibar-coaching.de",
        keySelector: "1728995224.coaching",
        privateKey: process.env.NEXT_PUBLIC_DKIM_PUBLIC_KEY,
    }
} as SMTPTransport.Options)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function sendSubmissionEmail(userId: string, email: string, workshopName: string, workshopId: string) {
    try {
        const info = await transporter.sendMail({
            to: `${ email }`, // list of receivers
            subject: "Deine Workshop Registrierung", // Subject line
            text: `Danke für Deine Anmeldung zum Workshop "${ workshopName.toUpperCase() }".\n Bitte klicke auf den folgenden Link, um Deine Anmeldung zu bestätigen. https://www.sensibar-coaching.de/rueckmeldungen/doubleOptIn?id=${ userId }&wsId=${ workshopId } .\n Dein Sensibar Team`, // plain text body
            //html: `<div>Danke für Deine Anmeldung. Bitte schließe Deine Anmeldung ab, um Deinen Platz zu sichern.<br/><a href={"https://www.webdeveloper-peterwolf.com/${userId}"} target="_blank"><h3>Anmeldung abschließen</h3></a> </div>`, // html body
        })

        return {msg: "email sucessfully sent", info}
    } catch (e) {
        return ({msg: "error sending email", error: e})
    }
}


export async function sendRegistrationFinalEmail(userId: string, email: string, name: string, workshopLink: string, title: string, workshopDate: string, location: {
    city: string,
    street: string,
    streetNumber: string,
    zipCode: string
}, workshopType: string) {

    const locationAddress = `${ location.street } ${ location.streetNumber }, ${ location.zipCode } ${ location.city }`

    let content: string

    switch (workshopType) {
        case 'hybrid':
            content = `<p>Du kannst dich entweder über den <br/>WebLink:  ${ workshopLink } einwählen oder <br> oder zu folgender Adresse: <br/>${ locationAddress }<p></p>`
            break;
        case 'inPerson':
            content = `<p>Der Workshop findet an folgender Adresse statt: <br/> ${ locationAddress }<p>`
            break;
        default:
            content = `<p>Nachfolgend findest du Deinen Einwähllink.<br/>WebLink:  ${ workshopLink }<p>`
    }


    try {
        const info = await transporter.sendMail({
            to: `${ email }`, // list of receivers
            subject: "Dein Platz ist gesichert!", // Subject line
            from: 'hello@sensibar-coaching.de',
            replyTo: 'hello@sensibar-coaching.de',
            html: `<div><p>Hey ${ name.toUpperCase() },</p> <p>Deine Anmeldung zum Workshop ${ title.toUpperCase() } am ${ workshopDate } ist bestätigt.</p>${ content }<p>Ich freue mich auf Dich, </p><p>Deine Yessica</p><p>Sensibar-Coaching | sensibel & wunderbar</p><p>Email: hello@sensibar-coaching.de <br/>Mobil: +49 176 625 05 701<br/>Adresse: Lindenstrasse 6a 85309 Pörnbach</p></div>`, // html body
        })

        return {msg: "email sucessfully sent", info}
    } catch (e) {
        return ({msg: "error sending email", error: e})
    }
}


export async function sendWorkshopCancelEmail(emails: string[], title: string, workshopDate: string) {

    const emailList = emails.join(", ")
    try {
        const info = await transporter.sendMail({
            from: '"Sensibar-Coaching - NoReply"',
            to: `${ emailList }`, // list of receivers
            subject: "Workshop wird abgesagt!", // Subject line

            html: `<div><p>Lieber Workshop Teilnehmer,</p> <p>Der Workshop ${ title.toUpperCase() } am ${ workshopDate } wird wegen zu geringer Teilnehmerzahl abgesagt.</p> <p>Ich bedaure dies sehr. <br/>Melde dich gern zu einem der anderen Workshops an. https://sensibar-coaching.de/workshops</p><p>Deine Yessica</p><p>Sensibar-Coaching | sensibel & wunderbar</p><p>Email: hello@sensibar-coaching.de <br/>Mobil: +49 176 625 05 701<br/>Adresse: Lindenstrasse 6a 85309 Pörnbach</p></div>`, // html body
        })

        return {msg: "email sucessfully sent", info}
    } catch (e) {
        return ({msg: "error sending email", error: e})
    }
}

export async function sendEmailToAdminAfterNewWorkshopRegistration(title: string, workshopDate: string, firstname: string, lastname:string) {

    try {
        const info = await transporter.sendMail({
            from: '"Sensibar-Coaching - NoReply"',
            to: 'hello@sensibar-coaching.de',
            subject: "Neue Workshop anmeldung!", // Subject line

            html: `<div><p>Hallo Yessica,</p> <p>Du hast eine neue Anmeldung zu dem Workshop ${ title?.toUpperCase() } am ${ workshopDate } von ${firstname?.toUpperCase()} ${lastname.toUpperCase()}.</div>`, // html body
        })
        return {msg: "email sucessfully sent", info}
    } catch (e) {
        return ({msg: "error sending email", error: e})
    }
}