import styles from './CartToast.module.css';
import fallbackImage from '@/assets/images/fallback.png';

interface CardToastProps {
  image?: string | null;
  title?: string;
}

export function CartToast({ image, title = '' }: CardToastProps) {
  return (
    <article className={styles.container}>
      <img src={image || fallbackImage} alt="" />
      <div className={styles.content}>
        <p>{title}</p>
        <div className={styles.footer}>
          <p>Product added to cart</p>
          <button>See cart</button>
        </div>
      </div>
    </article>
  );
}
