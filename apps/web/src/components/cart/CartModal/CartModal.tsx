import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
import styles from './CartModal.module.css';
import imgFallback from '@/assets/images/fallback.png';
import { useModal } from '@/hooks/useModal';
import { fetchProductById } from '@/services/fetchProductsById';
import { useCartStore } from '@/stores/cartStore';
import type { FormattedProduct } from '@/types/formattedProduct';
import { formatProduct } from '@/utils/formatProducts';
import { useEffect, useRef, useState } from 'react';
import { CartControllers } from '../CartControllers/CartControllers';
import { Star, Trash } from 'lucide-react';
import { useModalContext } from '@/context/ModalContext';
import { createPortal } from 'react-dom';

export const CART_MODAL_KEY = 'cartModal';

export function CartModal() {
  const [total, setTotal] = useState<Record<string, number>>({});
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalControls = useModal({
    dialogRef,
    autoClose: true,
    shouldHideScrollbar: true,
  });
  const { addModalControls } = useModalContext();
  const cart = useCartStore((store) => store.cart);

  useEffect(() => {
    addModalControls(CART_MODAL_KEY, modalControls);
  }, [addModalControls, modalControls]);

  useEffect(() => {
    if (!dialogRef.current) return;

    if (!modalControls.isOpening) {
      modalControls.close();
    } else {
      modalControls.open();
    }
  }, [modalControls]);

  return createPortal(
    <dialog className={styles.dialog} ref={dialogRef}>
      <h2>Products Cart ({Object.entries(cart).length})</h2>

      <ul className={styles.itemsList}>
        {Object.entries(cart).map(([id, item]) => (
          <CartItem id={id} quantity={item.quantity} key={id} setTotal={setTotal} />
        ))}
      </ul>

      <p className={styles.total}>
        Total: ${Object.values(total).reduce((prev, curr) => prev + curr, 0)}
      </p>
    </dialog>,
    document.body
  );
}

function CartItem({
  id,
  quantity,
  setTotal,
}: {
  id: string;
  quantity: number;
  setTotal: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}) {
  const [product, setProduct] = useState<Partial<FormattedProduct>>({});
  const [loading, setLoading] = useState(true);
  const removeItem = useCartStore((store) => store.removeItem);

  useEffect(() => {
    fetchProductById(id)
      .then((res) => {
        setProduct(formatProduct(res));
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!product.numericPrice) return;

    setTotal((prev) => ({ ...prev, [id]: (product.numericPrice ?? 0) * quantity }));

    return () => {
      setTotal((prev) => {
        const newValue = { ...prev };
        delete newValue[id];
        return newValue;
      });
    };
  }, [product.numericPrice, quantity, setTotal, id]);

  const { principalImage, title, promotion, price, originalPrice, shippingCost, numericPrice } =
    product;

  const hasDiscount = originalPrice !== price;

  return (
    <>
      <li>
        <div className={styles.imgContainer}>
          <img src={principalImage || imgFallback} alt={title?.fullContent || ''} />
          {!loading ? (
            <CartControllers className={styles.itemControls} id={id} quantity={quantity} />
          ) : (
            <Skeleton />
          )}
        </div>

        <div className={styles.contentContainer}>
          <h3>{title?.content ?? <Skeleton />}</h3>

          <div className={styles.detailsContainer}>
            <div className={styles.priceContainer}>
              {hasDiscount && (
                <p className={styles.originalPrice}>
                  <span className="sr-only">Original price: </span>
                  {originalPrice}
                </p>
              )}

              <p
                className={`${styles.price} ${hasDiscount ? styles.hasDiscount : ''}`}
                data-testid="price"
              >
                <span className="sr-only">Price: </span>
                {price ?? <Skeleton width="80px" />}
              </p>
            </div>

            {promotion && <p className={styles.promotion}>{promotion}</p>}
          </div>

          <p className={styles.shippingCost}>
            {shippingCost ? shippingCost.text : <Skeleton width="100px" />}
          </p>

          <div className={styles.footer}>
            <p className={styles.total}>
              {numericPrice ? (
                `Total: $${(numericPrice ?? 0) * quantity}`
              ) : (
                <Skeleton width={100} />
              )}
            </p>

            {!loading && (
              <div className={styles.buttons}>
                <button className={styles.favBtn} aria-label="Add item to favorites">
                  <Star />
                </button>
                <button
                  onClick={() => removeItem(id)}
                  className={styles.trashBtn}
                  aria-label="Delete item"
                >
                  <Trash />
                </button>
              </div>
            )}
          </div>
        </div>
      </li>
      <hr />
    </>
  );
}
