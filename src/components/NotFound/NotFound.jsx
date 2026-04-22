import styles from './NotFound.module.css';

export function NotFound() {
  return (
    <section className={styles.container}>
      <img
        className={styles.img}
        src="/not-found.webp"
        alt="Not found products"
      />
      <h3>No Products Found</h3>
      <p>We dont find what you was looking for.</p>
    </section>
  );
}
