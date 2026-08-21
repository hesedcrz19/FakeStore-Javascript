import { Link, useSearchParams } from 'react-router';
import styles from './ProductsError.module.css';
import errorImage from '@/assets/images/error.png';
import { useProductsStore } from '@/stores/productsStore';
import { setFiltersByParams } from '@/utils/setFiltersByParams';
import { PAGE } from '@/consts/filtersConsts';

export function ProductsError() {
  const fetchProducts = useProductsStore((store) => store.fetchProducts);
  const [searchParams] = useSearchParams();

  return (
    <section className={styles.container}>
      <img src={errorImage} className={styles.img} alt="" />
      <h2>Unexpected fetch error</h2>
      <p>An error occurred trying to fetch the products.</p>
      <div>
        <Link to={'/'}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1f1f1f"
          >
            <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
          </svg>
          Home
        </Link>
        <button
          onClick={() =>
            void fetchProducts(setFiltersByParams(searchParams), Number(searchParams.get(PAGE)))
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1f1f1f"
          >
            <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
          </svg>
          Retry
        </button>
      </div>
    </section>
  );
}
