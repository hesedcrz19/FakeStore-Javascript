import styles from './Page404.module.css';
import image404 from '@/assets/images/404.webp';

export default function Page404() {
  return (
    <div className={styles.container}>
      <img src={image404} alt="Page not found" />
      <p className={styles.oops}>Oops...</p>
      <p className={styles.details}>The page you&apos;re looking for can&apos;t be found.</p>
    </div>
  );
}
