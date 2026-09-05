import styles from './CartModal.module.css';
import emptyCartImg from '@/assets/images/cart-empty.webp';
import { useModal } from '@/hooks/useModal';
import { useCartStore } from '@/stores/cartStore';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useModalContext } from '@/context/ModalContext';
import { createPortal } from 'react-dom';
import { CartItem } from '../CartItem/CartItem';
import { motion, stagger, type Variants } from 'motion/react';

export const CART_MODAL_KEY = 'cartModal';

const dialogVariants: Variants = {
  close: {
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  open: {
    x: '-100%',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
      delayChildren: stagger(0, { startDelay: 0.3 }),
    },
  },
};

export function CartModal() {
  const [total, setTotal] = useState<Record<string, number>>({});
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalControls = useModal({
    dialogRef,
    autoClose: true,
    shouldHideScrollbar: true,
    controlTheTransitions: true,
  });
  const { addModalControls } = useModalContext();
  const cart = useCartStore((store) => store.cart);

  useEffect(() => {
    addModalControls(CART_MODAL_KEY, modalControls);
  }, [addModalControls, modalControls]);

  const { close, isOpening, startClosing } = modalControls;

  const cartLength = Object.keys(cart).length;

  return createPortal(
    <motion.dialog
      className={styles.dialog}
      ref={dialogRef}
      variants={dialogVariants}
      initial={isOpening ? 'open' : 'close'}
      animate={isOpening ? 'open' : 'close'}
      onAnimationComplete={(variant) => {
        if (variant === 'close') close();
      }}
    >
      <section className={styles.dialogFlex}>
        <button
          aria-label="Close cart modal"
          className={styles.closeBtn}
          onClick={() => startClosing()}
        >
          <X />
        </button>

        <h2>Products Cart ({cartLength})</h2>

        {cartLength ? (
          <ul className={styles.itemsList}>
            {Object.entries(cart).map(([id, item]) => (
              <li key={id} className={styles.itemContainer}>
                <CartItem id={id} quantity={item.quantity} setTotal={setTotal} />
                <hr />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyCart />
        )}

        <p className={styles.total}>
          {cartLength
            ? `Total: ${Object.values(total).reduce((prev, curr) => prev + curr, 0)}`
            : ''}
        </p>
      </section>
    </motion.dialog>,
    document.body
  );
}

function EmptyCart() {
  return (
    <div className={styles.emptyCart}>
      <img src={emptyCartImg} alt="" />
      <h3>The cart is empty.</h3>
      <p>You don&apos;t have any products in your cart yet.</p>
    </div>
  );
}
