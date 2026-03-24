import styles from "./Filters.module.css";

import { useFilters } from "../../context/FiltersContext";

export function Filters() {
  const { dispatchFilters, filters } = useFilters();

  return (
    <form className={styles.filtersForm} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.filterInput}
          placeholder="Shearch..."
          role="search"
          name="search"
          value={filters.search}
          onChange={(e) =>
            dispatchFilters({
              type: "TEXT",
              filter: "search",
              value: e.target.value,
            })
          }
        />
      </div>

      <hr className={styles.hr} />

      <div className={styles.priceFilters}>
        <h2 className={styles.prices}>Price</h2>
        <label>
          Min.
          <input
            type="text"
            inputMode="numeric"
            min="0"
            value={filters.minPrice}
            name="minPrice"
            onChange={(e) =>
              dispatchFilters({
                type: "NUMBER",
                filter: "minPrice",
                value: e.target.value,
              })
            }
          />
        </label>
        <label>
          Max.
          <input
            type="text"
            inputMode="numeric"
            min="0"
            value={filters.maxPrice}
            name="maxPrice"
            onChange={(e) =>
              dispatchFilters({
                type: "NUMBER",
                filter: "maxPrice",
                value: e.target.value,
              })
            }
          />
        </label>
      </div>

      <hr className={styles.hr} />

      <div className={styles.buttonsContainer}>
        <h2 className={styles.categories}>Categories</h2>
        <label className={styles.button}>
          All
          <input
            type="radio"
            name="category"
            value="all"
            checked={filters.category === "all"}
            onChange={(e) =>
              dispatchFilters({
                type: "RADIO",
                filter: "category",
                value: e.target.value,
              })
            }
          />
        </label>
        <label className={styles.button}>
          Clothes
          <input
            type="radio"
            name="category"
            value="clothes"
            checked={filters.category === "clothes"}
            onChange={(e) =>
              dispatchFilters({
                type: "RADIO",
                filter: "category",
                value: e.target.value,
              })
            }
          />
        </label>
        <label className={styles.button}>
          Electronics
          <input
            type="radio"
            name="category"
            value="electronics"
            checked={filters.category === "electronics"}
            onChange={(e) =>
              dispatchFilters({
                type: "RADIO",
                filter: "category",
                value: e.target.value,
              })
            }
          />
        </label>
        <label className={styles.button}>
          Furniture
          <input
            type="radio"
            name="category"
            value="furniture"
            checked={filters.category === "furniture"}
            onChange={(e) =>
              dispatchFilters({
                type: "RADIO",
                filter: "category",
                value: e.target.value,
              })
            }
          />
        </label>
        <label className={styles.button}>
          Shoes
          <input
            type="radio"
            name="category"
            value="shoes"
            checked={filters.category === "shoes"}
            onChange={(e) =>
              dispatchFilters({
                type: "RADIO",
                filter: "category",
                value: e.target.value,
              })
            }
          />
        </label>
        <label className={styles.button}>
          Miscellaneous
          <input
            type="radio"
            name="category"
            value="miscellaneous"
            checked={filters.category === "miscellaneous"}
            onChange={(e) =>
              dispatchFilters({
                type: "RADIO",
                filter: "category",
                value: e.target.value,
              })
            }
          />
        </label>
      </div>
    </form>
  );
}
