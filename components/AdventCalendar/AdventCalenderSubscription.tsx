'use client'
import AdventCalendarSubscriptionForm
    from "@/components/forms/AdventCalendarSubscriptionForm/AdventCalendarSubscriptionForm";
import Button from "@/components/global/Button";
import {useLocalStorage} from "@/hooks/useLocalStorage";

export const LOCAL_STORAGE_KEY_ADVENT_SUBSCRIPTION = "advent_subscription"
const AdventCalenderSubscription = ({isOpened, handleModal}: { isOpened: boolean, handleModal: () => void }) => {

    const openStyle = isOpened ? "block" : "none";
    const {value: hasSubscribed, setStoredValue} = useLocalStorage(LOCAL_STORAGE_KEY_ADVENT_SUBSCRIPTION, false);

    function handleSetter() {
        setStoredValue(!hasSubscribed)
    }

    return (
        <div className={ "globalModal" } style={ {display: openStyle} }>
            <div className={ "globalModalInner" }>
                <div className={ "globalModalBody" }>
                    <div style={ {color: "red"} }>
                        <Button type={ "submit" } title={ "Schließen" } action={ handleModal }/>
                    </div>

                    <div style={ {display: "flex", alignItems: "center", paddingBottom: 20} }><input
                        id={ "advent_subscription" } type="checkbox" onClick={ handleSetter }
                        checked={ hasSubscribed }/><label htmlFor={ "advent_subscription" }>Meldung nicht mehr
                        anzeigen</label></div>
                    <h3 className="">Adventskalender abonnieren</h3>
                    <AdventCalendarSubscriptionForm handleModal={ handleModal }/>
                </div>
            </div>
        </div>
    );
}

export default AdventCalenderSubscription;