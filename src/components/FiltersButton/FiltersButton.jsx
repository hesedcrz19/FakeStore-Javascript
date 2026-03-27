import styles from "./FiltersButton.module.css";

import { useRef } from "react";
import { useModal } from "@/hooks/useModal.js";

import { useFilters } from "../../context/FiltersContext";

export function FiltersButton() {
  const filtersRef = useRef(null);
  const { openModal, closeModal } = useModal({
    dialogRef: filtersRef,
    hideScrollbar: false,
  });
  const { dispatchFilters, filters } = useFilters();

  const categories = [
    { category: "all", name: "All" },
    { category: "clothes", name: "Clothes"},
    { category: "electronics", name: "Electronics" },
    { category: "furniture", name: "Furniture" },
    { category: "miscellaneous", name: "Miscellaneous" },
  ];

  return (
    <>
      <button
        className={styles.filtersButton}
        aria-label="open filters"
        onClick={openModal}
      >
        Filters
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e3e3e3"
        >
          <path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z" />
        </svg>
      </button>
      
      <dialog
        className={styles.filtersDialog}
        data-direction="right"
        ref={filtersRef}
      >
        <div className={styles.filtersDialogFlex}>
          <button
            className={styles.filtersDialogClose}
            onClick={closeModal}
            aria-label="close filters"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1f1f1f"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>

          <form
            className={styles.filtersForm}
            onSubmit={(e) => e.preventDefault()}
          >
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

            <fieldset className={styles.priceFilters}>
              <legend>Price</legend>
              <label>
                <span>Min.</span>
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
                <span>Max.</span>
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
            </fieldset>

            <fieldset className={styles.buttonsContainer}>
              <legend>Categories</legend>
              {categories.map((el) => (
                <label className={styles.button} key={el.category}>
                  {el.name}
                  <input
                    type="radio"
                    name="category"
                    value={el.category}
                    checked={filters.category === el.category}
                    onChange={(e) =>
                      dispatchFilters({
                        type: "RADIO",
                        filter: "category",
                        value: e.target.value,
                      })
                    }
                  />
                </label>
              ))}
            </fieldset>
          </form>
        </div>
      </dialog>
    </>
  );
}
