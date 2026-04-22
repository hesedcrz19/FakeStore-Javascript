import styles from './Page404.module.css';

export default function Page404() {
  return (
    <div className={styles.container}>
      <img src="/404.webp" alt="404" />
      <p className={styles.oops}>Oops...</p>
      <p className={styles.details}>
        The page you&apos;re looking for can&apos;t be found.
      </p>
    </div>
  );
}
