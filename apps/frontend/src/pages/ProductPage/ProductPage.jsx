import styles from './ProductPage.module.css';

import { useParams } from 'react-router';
import { Product } from '@/components/Product/Product';

export default function ProductPage() {
  const { slug } = useParams();

  return (
    <div className={styles.container}>
      <Product slug={slug} />
    </div>
  );
}
