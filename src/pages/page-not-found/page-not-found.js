import styles from './page-not-found.module.css';
import img from '../../images/web-error-page-outer-space-404-illustration-vector.jpg';

const PageNotFound = () => {
  return (
    <main className={styles.content}>
      <div className={styles.wrap}>
        <img className={styles.img} src={img} alt='404' />
      </div>
    </main>
  );
};

export default PageNotFound;
