import styles from './ProductCard.module.css';
import fallbackImage from '@/assets/images/fallback.png';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router';
import { useRouter } from '@/hooks/useRoute';
import type { FormattedProduct } from '@/types/formattedProduct';
import type React from 'react';

interface ProductCardProps {
  product: Partial<FormattedProduct>;
  loading: boolean;
}

export function ProductCard({ product, loading }: ProductCardProps) {
  const {
    title,
    price,
    originalPrice,
    discountPercentage,
    shippingCost,
    promotion,
    principalImage,
    category,
  } = product;

  const imageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const imageElement = event.target as HTMLImageElement;
    imageElement.src = fallbackImage;
  };

  return (
    <li className={styles.productItem}>
      <article className={styles.productCard}>
        {!loading && <ProductLink product={product} />}

        <header className={styles.header}>
          {!loading ? (
            <img
              src={principalImage || '/fallback.png'}
              alt={title?.fullContent}
              onError={imageError}
            />
          ) : (
            <Skeleton style={{ aspectRatio: 1 / 1 }} />
          )}
        </header>

        <h3>{title?.content ?? <Skeleton count={2} />}</h3>

        <Link
          to={loading ? '' : `/products?category=${category?.slug}`}
          className={styles.category}
        >
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
            <p className={styles.price} data-testid="price">
              <span className="sr-only">Price: </span>
              {price ?? <Skeleton width="80px" />}
            </p>
            {originalPrice !== price && (
              <p className={styles.originalPrice}>
                <span className="sr-only">Original price: </span>
                {originalPrice}
              </p>
            )}
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
    </li>
  );
}

function ProductLink({ product }: { product: Partial<FormattedProduct> }) {
  const { location, searchParams } = useRouter();

  return (
    <Link
      to={`/products/${product.slug ?? ''}?${searchParams.toString()}`}
      state={{ backgroundLocation: location.pathname, product: product }}
      className={styles.link}
      aria-label={`See more about ${product.title?.fullContent}`}
      replace
    />
  );
}
