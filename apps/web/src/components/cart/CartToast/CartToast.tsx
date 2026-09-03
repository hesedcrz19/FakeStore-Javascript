import { useModalContext } from '@/context/ModalContext';
import styles from './CartToast.module.css';
import fallbackImage from '@/assets/images/fallback.png';
import { CART_MODAL_KEY } from '../CartModal/CartModal';

interface CardToastProps {
  image?: string | null;
  title?: string;
}

export function CartToast({ image, title = '' }: CardToastProps) {
  const { open } = useModalContext();

  return (
    <article className={styles.container}>
      <img src={image || fallbackImage} alt="" />
      <div className={styles.content}>
        <p>{title}</p>
        <div className={styles.footer}>
          <p>Product added to cart</p>
          <button onClick={() => open(CART_MODAL_KEY)}>See cart</button>
        </div>
      </div>
    </article>
  );
}
