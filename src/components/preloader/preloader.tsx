import styles from './preloader.module.css'

const Preloader = (): JSX.Element => {
    return (
        <div className={styles.preloader}>
            <div className={styles['preloader-container']}>
                <span className={styles['preloader-round']}></span>
            </div>
        </div>
    )
};

export default Preloader
