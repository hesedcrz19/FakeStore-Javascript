import styles from './ProductsPagination.module.css';
import { PAGE } from '@/consts/filtersConsts';
import { useProductsStore } from '@/stores/productsStore';
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
          <BackwardArrow />
        </PageLink>
      ) : (
        <span>
          <BackwardArrow />
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
          <ForwardArrow />
        </PageLink>
      ) : (
        <span>
          <ForwardArrow />
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

function ForwardArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#e3e3e3"
    >
      <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
    </svg>
  );
}

function BackwardArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#e3e3e3"
    >
      <path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z" />
    </svg>
  );
}
