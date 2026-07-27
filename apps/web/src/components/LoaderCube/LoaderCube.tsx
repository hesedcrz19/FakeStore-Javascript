import styles from './LoaderCube.module.css';

export function LoaderCube() {
  return (
    <div className={styles.loadingScreen}>
      <h2>Loading...</h2>
      <div className={styles.cube}>
        <div className={styles.cubeFace}></div>
        <div className={styles.cubeFace}></div>
        <div className={styles.cubeFace}></div>
        <div className={styles.cubeFace}></div>
        <div className={styles.cubeFace}></div>
        <div className={styles.cubeFace}></div>
      </div>
    </div>
  );
}
