import styles from './NotFound.module.css';
import notFoundImage from '@/assets/images/not-found.webp';

export function NotFound() {
  return (
    <section className={styles.container}>
      <img className={styles.img} src={notFoundImage} alt="Not found products" />
      <h3>No Products Found</h3>
      <p>We don&apos;t find what you was looking for.</p>
    </section>
  );
}
