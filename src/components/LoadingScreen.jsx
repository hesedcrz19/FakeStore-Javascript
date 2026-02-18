import styles from "../styles/Products.module.css"

export function LoadingScreen(){
  return(
    <div className={styles.loadingScreen}>
      <h3>Loading...</h3>
      <div className={styles.cube}>
        <div className={styles.cubeFace}></div>
        <div className={styles.cubeFace}></div>
        <div className={styles.cubeFace}></div>
        <div className={styles.cubeFace}></div>
        <div className={styles.cubeFace}></div>
        <div className={styles.cubeFace}></div>
      </div>
    </div>
  )
}