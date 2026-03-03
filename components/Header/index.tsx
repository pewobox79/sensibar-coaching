import Navigation from "@/components/Navigation";
import styles from '@/styles/Header.module.css'
import Image from "next/image";
import Logo from "@/assets/images/sensibar-coaching-logo-neu.png";




const Header = () => {

    return <header className={styles.headerElement}>
        <Image className={styles.logo} src={Logo.src} alt="Logo" width={300} height={110}/>
        <Navigation/>

    </header>
}

export default Header;