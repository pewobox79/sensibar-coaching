import Navigation from "@/components/Navigation";
import styles from '@/styles/Header.module.css'
import Image from "next/image";
import Logo from "@/assets/images/sensibar-coaching-logo-neu.png";
import Link from "next/link";




const Header = () => {

    return <header className={styles.headerElement}>
        <Link href={"/"}><Image className={styles.logo} src={Logo.src} alt="Logo" width={300} height={110}/></Link>
        <Navigation/>

    </header>
}

export default Header;