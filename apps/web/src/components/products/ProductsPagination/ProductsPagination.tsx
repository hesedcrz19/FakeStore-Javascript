import styles from './ProductsPagination.module.css';
import { PAGE } from '@/consts/filtersConsts';
import { useProductsStore } from '@/stores/productsStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router';

export function ProductsPagination() {
  const {
    totalPages = 0,
    page = 0,
    loading,
    hasNextPage,
    hasPreviousPage,
    error,
  } = useProductsStore();
  if (loading || error || totalPages <= 1) return;

  return (
    <nav className={styles.nav}>
      {hasPreviousPage ? (
        <PageLink page={page - 1}>
          <ChevronLeft />
        </PageLink>
      ) : (
        <span>
          <ChevronLeft />
        </span>
      )}
      {Array(totalPages)
        .fill(null)
        .map((_, i) => (
          <PageLink key={i} page={i + 1} currentPage={page}>
            {i + 1}
          </PageLink>
        ))}
      {hasNextPage ? (
        <PageLink page={page + 1}>
          <ChevronRight />
        </PageLink>
      ) : (
        <span>
          <ChevronRight />
        </span>
      )}
    </nav>
  );
}

function PageLink({
  page,
  currentPage,
  children,
}: {
  page: number;
  currentPage?: number;
  children: ReactNode;
}) {
  const [searchParams] = useSearchParams();

  const params = new URLSearchParams(searchParams);

  params.set(PAGE, String(page));

  if (page <= 1) params.delete(PAGE);

  const isActive = currentPage === page;

  return (
    <Link
      className={isActive || !currentPage ? styles.active : ''}
      to={`/products?${params.toString()}`}
      aria-current={isActive}
      onClick={() => window.scrollTo(0, 0)}
    >
      {children}
    </Link>
  );
}
