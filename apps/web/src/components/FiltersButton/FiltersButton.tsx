import styles from './FiltersButton.module.css';
import { useRef, useEffect } from 'react';
import { useModal } from '@/hooks/useModal';
import { useFilters } from '@/context/FiltersContext';
import {
  FILTERS_KEYS,
  FREE_SHIPPING_TRUE,
  HAS_PROMOTION_TRUE,
  SORT_BY,
  SORT_ORDER,
} from '@/consts/filtersConsts';
import type { Filters } from '@/types/filtersTypes';
import type { Changers } from '@/hooks/useFiltersReducer';
import { motion, stagger, type Variants } from 'motion/react';

const dialogVariants: Variants = {
  close: {
    x: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
      when: 'afterChildren',
      delayChildren: stagger(0.05, { startDelay: 0, from: 'last' }),
    },
  },
  open: {
    x: '-100%',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
      delayChildren: stagger(0.1, { startDelay: 0.2 }),
    },
  },
};

const fieldsetVariants: Variants = {
  close: {
    y: 30,
    opacity: 0,
    transition: {
      duration: 0.1,
      ease: 'easeOut',
      when: 'afterChildren',
      delayChildren: stagger(0.05, { startDelay: 0, from: 'last' }),
    },
  },
  open: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.15,
      ease: 'easeOut',
      delayChildren: stagger(0.15, { startDelay: 0.2 }),
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
  const {
    changeText,
    changeMinPrice,
    changeMaxPrice,
    changeSortBy,
    changeSortOrder,
    changeMinDiscount,
    changeFreeShipping,
    changeHasPromotion,
  } = changers;

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
            <motion.div variants={fieldsetVariants} className={styles.inputContainer}>
              <SearchInput changeText={changeText} filters={filters} />
            </motion.div>

            <motion.fieldset variants={fieldsetVariants} className={styles.priceFilters}>
              <legend>Price</legend>
              <MinPriceInput changeMinPrice={changeMinPrice} filters={filters} />
              <MaxPriceInput changeMaxPrice={changeMaxPrice} filters={filters} />
            </motion.fieldset>

            <motion.fieldset variants={fieldsetVariants} className={styles.sortFilters}>
              <legend>Sort</legend>
              <SortBySelect filters={filters} changeSortBy={changeSortBy} />
              <SortOrderSelect filters={filters} changeSortOrder={changeSortOrder} />
            </motion.fieldset>

            <motion.fieldset variants={fieldsetVariants} className={styles.minDiscountFilter}>
              <legend>Discount</legend>
              <MinDiscountRange filters={filters} changeMinDiscount={changeMinDiscount} />
            </motion.fieldset>

            <motion.fieldset variants={fieldsetVariants} className={styles.othersFilters}>
              <legend>Others</legend>
              <label>
                Free shipping
                <input
                  type="checkbox"
                  onChange={(e) => changeFreeShipping(e.target.checked ? FREE_SHIPPING_TRUE : '')}
                  checked={filters.free_shipping === FREE_SHIPPING_TRUE}
                />
              </label>
              <label>
                Has promotion
                <input
                  type="checkbox"
                  onChange={(e) => changeHasPromotion(e.target.checked ? HAS_PROMOTION_TRUE : '')}
                  checked={filters.has_promotion === HAS_PROMOTION_TRUE}
                />
              </label>
            </motion.fieldset>
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
      className={styles.searchFilter}
      aria-label="Search product"
      type="search"
      placeholder="Search..."
      name={FILTERS_KEYS.SEARCH}
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
        name={FILTERS_KEYS.MIN_PRICE}
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
        name={FILTERS_KEYS.MAX_PRICE}
        onChange={(event) => changeMaxPrice(event.target.value)}
      />
    </label>
  );
}

interface SortBySelectProps {
  changeSortBy: Changers['changeSortBy'];
  filters: Filters;
}

function SortBySelect({ filters, changeSortBy }: SortBySelectProps) {
  return (
    <label>
      Sort by:
      <select
        value={filters.sort_by}
        name={FILTERS_KEYS.SORT_BY}
        onChange={(e) => changeSortBy(e.target.value)}
      >
        <option value={SORT_BY.NEWEST}>Newest</option>
        <option value={SORT_BY.PRICE}>Price</option>
        <option value={SORT_BY.RATING}>Rating</option>
        <option value={SORT_BY.TITLE}>Title</option>
      </select>
    </label>
  );
}

interface SortOrderSelectProps {
  changeSortOrder: Changers['changeSortOrder'];
  filters: Filters;
}

function SortOrderSelect({ filters, changeSortOrder }: SortOrderSelectProps) {
  return (
    <label>
      Sort order:
      <select
        name={FILTERS_KEYS.SORT_ORDER}
        onChange={(e) => changeSortOrder(e.target.value)}
        value={filters.sort_order}
      >
        <option value={SORT_ORDER.DESC}>Descendant</option>
        <option value={SORT_ORDER.ASC}>Ascendant</option>
      </select>
    </label>
  );
}

interface MinDiscountRangeProps {
  changeMinDiscount: Changers['changeMinDiscount'];
  filters: Filters;
}

function MinDiscountRange({ filters, changeMinDiscount }: MinDiscountRangeProps) {
  return (
    <label>
      Min discount: {filters.min_discount}
      <input
        type="range"
        min={0}
        max={100}
        onChange={(e) => changeMinDiscount(e.target.value)}
        value={filters.min_discount}
        defaultValue={0}
      />
    </label>
  );
}
