import styles from './ProductCard.module.css';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { Link } from '../Link';

import { useRouter } from '@/hooks/useRoute';

export function ProductCard({ formattedProduct, loading }) {
  const {
    title,
    price,
    principalImage,
    slug,
    category,
    originalPrice,
    shippingCost,
    promotion,
    discountPercentage,
  } = formattedProduct || {};

  const imageError = (event) => {
    event.target.src = '/fallback.png';
  };

  return (
    <article className={styles.productCard}>
      <ProductLink slug={slug} />

      <header className={styles.header}>
        {principalImage ? (
          <img src={principalImage} alt={title?.fullContent} onError={imageError} />
        ) : (
          <Skeleton style={{ aspectRatio: 1 / 1 }} />
        )}
      </header>

      <h3>{title?.content ?? <Skeleton count={2} />}</h3>

      <Link href={`/products?category=${category?.slug ?? ''}`} className={styles.category}>
        {category?.name.content ?? <Skeleton width="50px" />}
      </Link>

      <div className={styles.pricesContainer}>
        {(discountPercentage !== 0 || promotion !== null) && (
          <ul className={styles.promos}>
            {promotion !== null && (
              <li className={styles.promotion}>{promotion ?? <Skeleton width="50px" />}</li>
            )}
            {discountPercentage !== 0 && (
              <li className={styles.promotion}>
                {discountPercentage ? `${discountPercentage}% off` : <Skeleton width="50px" />}
              </li>
            )}
          </ul>
        )}
        <div className={styles.prices}>
          <p className={styles.price}>{price ?? <Skeleton width="80px" />}</p>
          {originalPrice !== price && <p className={styles.originalPrice}>{originalPrice}</p>}
        </div>
      </div>

      <p className={styles.shippingCost}>
        {shippingCost ? shippingCost.text : <Skeleton width="100px" />}
      </p>

      <footer className={styles.footer}>
        {loading ? (
          <Skeleton height={30} />
        ) : (
          <button className={styles.addToCartBtn}>Add to Cart</button>
        )}
      </footer>
    </article>
  );
}

function ProductLink({ slug, children }) {
  const { location, searchParams } = useRouter();

  return (
    <Link
      href={`/products/${slug ?? ''}?${searchParams.toString()}`}
      state={{ backgroundLocation: location }}
      className={styles.link}
      aria-label="See more information"
      replace
    >
      {children}
    </Link>
  );
}
