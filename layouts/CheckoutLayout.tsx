import {ReactElement, ReactNode} from "react";

import styles from '@/styles/CheckoutElements.module.css'
import Container from "@/components/global/Container";

const CheckoutLayout = ({children}:{children: ReactNode |ReactElement |ReactElement[]}) => {
    return <Container id={"checkout"} backgroundColor={"#fff"}>
        <div className={styles.checkoutOverviewWrapper}>
            { children }
        </div>
    </Container>
}

export default CheckoutLayout