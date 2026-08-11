import styles from './FiltersButton.module.css';
import { useRef, useState, useEffect } from 'react';
import { useModal } from '@/hooks/useModal';
import { useFilters } from '@/context/FiltersContext';
import { categoriesFetch } from '@/services/categoriesFetch';
import { formatCategory } from '@/utils/formatCategory';
import { FILTERS_KEYS, FILTERS_DEFAULT_VALUES } from '@/consts/filtersConsts';
import type { Filters } from '@/types/filtersTypes';
import type { Changers } from '@/hooks/useFiltersReducer';
import type { FormattedCategory } from '@/types/formattedCategory';
import { motion, type Variants } from 'motion/react';

const dialogVariants: Variants = {
  close: {
    x: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  open: {
    x: '-100%',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

export function FiltersButton() {
  const filtersRef = useRef<HTMLDialogElement>(null);
  const { isOpening, open, close, startClosing, startOpening } = useModal({
    dialogRef: filtersRef,
    shouldHideScrollbar: false,
    autoClose: true,
  });
  const { filters, changers } = useFilters();
  const { changeText, changeMinPrice, changeMaxPrice, changeCategory } = changers;

  useEffect(() => {
    if (isOpening) open();
  }, [isOpening, close, open]);

  return (
    <>
      <button className={styles.filtersButton} aria-label="Open filters" onClick={startOpening}>
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

      <motion.dialog
        className={styles.filtersDialog}
        variants={dialogVariants}
        initial={isOpening ? 'open' : 'close'}
        animate={isOpening ? 'open' : 'close'}
        onAnimationComplete={(variant) => {
          if (variant === 'close') close();
        }}
        ref={filtersRef}
      >
        <div className={styles.filtersDialogFlex}>
          <button
            className={styles.filtersDialogClose}
            onClick={startClosing}
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

          <form className={styles.filtersForm} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.inputContainer}>
              <SearchInput changeText={changeText} filters={filters} />
            </div>

            <fieldset className={styles.priceFilters}>
              <legend>Price</legend>
              <MinPriceInput changeMinPrice={changeMinPrice} filters={filters} />
              <MaxPriceInput changeMaxPrice={changeMaxPrice} filters={filters} />
            </fieldset>

            <fieldset className={styles.buttonsContainer}>
              <legend>Categories</legend>
              <CategoryRadios changeCategory={changeCategory} filters={filters} />
            </fieldset>
          </form>
        </div>
      </motion.dialog>
    </>
  );
}

interface SearchInputProps {
  changeText: Changers['changeText'];
  filters: Filters;
}

function SearchInput({ changeText, filters }: SearchInputProps) {
  return (
    <input
      className={styles.filterInput}
      aria-label="Search product"
      type="search"
      placeholder="Search..."
      name="search"
      value={filters[FILTERS_KEYS.SEARCH]}
      onChange={(event) => changeText(event.target.value)}
    />
  );
}

interface MinPriceInputProps {
  changeMinPrice: Changers['changeMinPrice'];
  filters: Filters;
}

function MinPriceInput({ changeMinPrice, filters }: MinPriceInputProps) {
  return (
    <label>
      <span>Min.</span>
      <input
        type="text"
        inputMode="numeric"
        min="0"
        value={filters[FILTERS_KEYS.MIN_PRICE]}
        name="minPrice"
        onChange={(event) => changeMinPrice(event.target.value)}
      />
    </label>
  );
}

interface MaxPriceInputProps {
  changeMaxPrice: Changers['changeMaxPrice'];
  filters: Filters;
}

function MaxPriceInput({ changeMaxPrice, filters }: MaxPriceInputProps) {
  return (
    <label>
      <span>Max.</span>
      <input
        type="text"
        inputMode="numeric"
        min="0"
        value={filters[FILTERS_KEYS.MAX_PRICE]}
        name="maxPrice"
        onChange={(event) => changeMaxPrice(event.target.value)}
      />
    </label>
  );
}

interface CategoryRadiosProps {
  changeCategory: Changers['changeCategory'];
  filters: Filters;
}

function CategoryRadios({ changeCategory, filters }: CategoryRadiosProps) {
  const [categories, setCategories] = useState<FormattedCategory[]>([]);

  useEffect(() => {
    categoriesFetch()
      .then((data) => setCategories(data.map((category) => formatCategory(category))))
      .catch(() => setCategories([]));
  }, []);

  const categoriesElements = categories.map(({ id, name, slug }) => {
    return (
      <label className={styles.button} key={id}>
        {name}
        <input
          type="radio"
          name="category"
          value={slug}
          checked={filters[FILTERS_KEYS.CATEGORY] === slug}
          onChange={() => changeCategory(slug)}
        />
      </label>
    );
  });

  categoriesElements.unshift(
    <label className={styles.button} key={FILTERS_DEFAULT_VALUES[FILTERS_KEYS.CATEGORY]}>
      All
      <input
        type="radio"
        name="category"
        value={FILTERS_DEFAULT_VALUES[FILTERS_KEYS.CATEGORY]}
        checked={filters[FILTERS_KEYS.CATEGORY] === FILTERS_DEFAULT_VALUES[FILTERS_KEYS.CATEGORY]}
        onChange={() => changeCategory(FILTERS_DEFAULT_VALUES[FILTERS_KEYS.CATEGORY])}
      />
    </label>
  );

  return categoriesElements;
}
