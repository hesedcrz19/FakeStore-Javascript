import styles from "./CategoryFilters.module.css"

export function CategoryFilters({ className }){
  return(
    <form className={styles[className]}>
      <div className={styles.inputContainer}>
        <input type="text" className={styles.filterInput} placeholder='Shearch...' />
      </div>

      <hr className={styles.hr}/>

      <div className={styles.buttonsContainer}>
        <p className={styles.p}>Categories</p> 

        <button data-id={null} className={styles.button}>All</button>
        <button data-id={'1'} className={styles.button}>Clothes</button>
        <button data-id={'2'} className={styles.button}>Electronics</button>
        <button data-id={'3'} className={styles.button}>Furtnite</button>
        <button data-id={'4'} className={styles.button}>Shoes</button>
        <button data-id={'5'} className={styles.button}>Miscellaneous</button>
      </div>
    </form>
  )
}