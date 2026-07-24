import styles from './Product.module.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useState, useEffect } from 'react';
import { productFetch } from '@/services/productFetch';
import { formatProduct } from '@/utils/formatProducts';
import { ProductCarrousel } from '../ProductCarrousel/ProductCarrousel';
import { useLocation } from 'react-router';
import type { FormattedProduct } from '@/types/formattedProduct';

export function Product({ slug }: { slug: string | undefined }) {
  const { state } = useLocation() as { state?: { product?: FormattedProduct } };

  const [product, setProduct] = useState<Partial<FormattedProduct>>(() =>
    state?.product && state.product.slug === slug ? state.product : {}
  );
  const [loading, setLoading] = useState(() => (state?.product?.slug === slug ? false : true));
  const [error, setError] = useState(false);

  const {
    title,
    category,
    price,
    description,
    originalPrice,
    discountPercentage,
    shippingCost,
    promotion,
  } = product;

  useEffect(() => {
    if (product.slug === slug) return;

    productFetch(slug)
      .then((product) => {
        setProduct(formatProduct(product));
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug, product.slug]);

  if (error) {
    return <p>A error as occurred</p>;
  }

  return (
    <article className={styles.productContainer}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title?.fullContent ?? <Skeleton />}</h2>
      </header>

      <div className={styles.content}>
        <ProductCarrousel product={product} loading={loading} />

        <div className={styles.rightSide}>
          <p className={styles.description}>{description?.fullContent ?? <Skeleton count={6} />}</p>

          <div className={styles.details}>
            <p className={styles.detailsItem}>
              {category?.name.fullContent ?? <Skeleton width={80} />}
            </p>
          </div>

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
              <p className={styles.price}>{price ?? <Skeleton width={100} />}</p>
              {originalPrice !== price && <p className={styles.originalPrice}>{originalPrice}</p>}
            </div>
          </div>

          <p className={styles.shippingCost}>
            {shippingCost ? shippingCost.text : <Skeleton width="100px" />}
          </p>

          <footer className={styles.footer}>
            {loading ? (
              <Skeleton height={35} borderRadius={10} />
            ) : (
              <button className={styles.addToCartButton}>Add to Cart</button>
            )}
          </footer>
        </div>
      </div>
    </article>
  );
}
