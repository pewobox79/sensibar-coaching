import styles from '@/styles/Event.module.css'
import EventRegistration from "@/components/forms/EventRegistration";
import EventInfoBox from "@/components/forms/EventRegistration/EventInfoBox";

const SingleEvent = () => {

    return <div className={ styles.singleEventWrapper }>
        <div className={ styles.singleEventInner }>
            <div className={ styles.singleEventHeader }>
                <h3>Event Title</h3>
            </div>

            <div className={ styles.singleEventMainContent }>
                <div className={ styles.singleEventContent50 }>
                    <div className={styles.singleEventDescriptionParagraph}>
                        <h3>Zielgruppe:</h3>
                        <p>Dieser Workshop richtet sich an hochsensible Personen, die ihre Sensibilität als Stärke
                            nutzen
                            und ein ausgeglichenes, erfülltes Leben führen möchten. Ob im Beruf oder im Privatleben –
                            Hochsensibilität bringt besondere Herausforderungen und gleichzeitig enorme Potenziale mit
                            sich.</p>
                    </div>
                    <div className={styles.singleEventDescriptionParagraph}>
                        <h3>Workshop Beschreibung:</h3>
                        <p>Fühlst du dich, als wärst du nicht gut genug, setzt dich selbst enorm unter Druck und nimmst
                            Dinge schnell persönlich?
                            Sprüche wie „du bist zu nah am Wasser gebaut“ oder „du nimmst dir alles zu sehr zu Herzen“
                            ziehen sich durch dein Leben. Außerdem hast du das Gefühl, dass dir ständig alles zu viel
                            ist.
                            Vielleicht gibt es eine einfache Erklärung dafür? Deine Hochsensibilität.
                            In meinem Workshop lernst Du was Hochsensibilität ist, welche Herausforderungen sich im
                            Alltag zeigen können und warum sie dein Leben so bereichern kann.
                            Der Workshop richtet sich an alle, die sich mehr Leichtigkeit im Alltag wünschen und ihre
                            Sensibilität als Stärke entdecken und nutzen möchten. </p>
                    </div>
                    <div className={styles.singleEventDescriptionParagraph}>
                        <h3>Inhalt</h3>
                      <ul>
                            <li>Was ist HSP?</li>
                            <li>Ursprung und Forschung</li>
                            <li>DOES Model</li>
                            <li>Typische Anzeichen für Hochsensibilität</li>
                            <li>Introvertierte und extrovertierte HSP</li>
                            <li>Wie kann ich gut mit HS umgehen?</li>
                            <li>Übungen, um das Nervensystem zur Ruhe kommen zu lassen</li>
                        </ul>
                    </div>
                    <div className={styles.singleEventDescriptionParagraph}>
                   Bist du dir nicht sicher, ob du hochsensibel bist. Macht nicht’s!
                        Es gibt zahlreiche Tests, die dir eine Tendenz geben. Ich mag diesen gerne..XYZ
                    </div>
                </div>
                <div className={ styles.singleEventContent50 }>
                    <EventInfoBox/>
                    <EventRegistration/></div>
            </div>
        </div>

    </div>
}

export default SingleEvent;