'use client'
import {useOrderStore} from "@/stores/useOrderStore";
import styles from "@/styles/Formstyles.module.css";
import {Form} from "react-bootstrap";
import {LocationType} from "@/types/generalTypes";

const BillingAddress = () => {

    const {value, updateBillingAddress} = useOrderStore();

    function handleUpdateBillingAddress(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        updateBillingAddress(name as keyof LocationType, value)
    }

    return (
        <div>
            <form >
                <div className={ styles.formItem }>
                    <Form.Control
                        type="text"
                        id="street"
                        placeholder="Strasse"
                        name={ "street" }
                        value={ value.billingAddress?.street }
                        onChange={handleUpdateBillingAddress}
                    />
                </div>
                <div className={ styles.formItem }>
                    <Form.Control
                        type="text"
                        id="streetNumber"
                        placeholder='Hausnummer'
                        inputMode={"numeric"}
                        value={ value?.billingAddress?.streetNumber }
                        onChange={ handleUpdateBillingAddress }
                        name={ "streetNumber" }
                    />
                </div>
                <div className={ styles.formItem }>
                    <Form.Control
                        type="text"
                        id="city"
                        placeholder="Stadt"
                        value={ value.billingAddress?.city }
                        onChange={ handleUpdateBillingAddress }
                        inputMode={ "text" }
                        name={ "city" }
                    />
                </div>
                <div className={ styles.formItem }>
                    <Form.Control
                        type="text"
                        id="zipCode"
                        placeholder="Postleitzahl"
                        value={ value.billingAddress?.zipCode }
                        onChange={ handleUpdateBillingAddress }
                        inputMode={ "text" }
                        name={ "zipCode" }
                    />
                </div>
                <div className={ styles.formItem }>

                    <Form.Control
                        as="select"
                        type="text"
                        id="country"
                        placeholder="Land"
                        value={ value.billingAddress?.country}
                        onChange={ handleUpdateBillingAddress}
                        inputMode={ "text" }
                        name={ "country" }
                    >
                        <option value="">Land auswählen</option>
                        <option value="Deutschland">Deutschland</option>
                        <option value="Österreich">Österreich</option>
                        <option value="Schweiz">Schweiz</option>
                    </Form.Control>
                </div>
            </form>
        </div>
    );
};

export default BillingAddress;