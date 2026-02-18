import styles from "../styles/Products.module.css"

export function FiltersSection(){
  return(
    <form className={styles.filtersForm}>
      <input type="text" className={styles.filterInput} placeholder='Shearch...' />
      <button data-id={null}>All</button>
      <button data-id={'1'}>Clothes</button>
      <button data-id={'2'}>Electronics</button>
      <button data-id={'3'}>Furtnite</button>
      <button data-id={'4'}>Shoes</button>
      <button data-id={'5'}>Miscellaneous</button>
    </form>
  )
}