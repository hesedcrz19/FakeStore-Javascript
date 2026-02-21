import styles from "./LoaderCube.module.css"

export function LoaderCube(){
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