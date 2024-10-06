import styles from '@/styles/Navigation.module.css'

const MobileNav = () => {

    return <div className={ styles.mobileNavWrapper }>
        <div className={styles.mobileNavInner}>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </div>
    </div>

}

export default MobileNav;