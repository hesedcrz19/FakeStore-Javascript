import { NavLink, type NavLinkProps } from 'react-router';
import { useSearchParams } from 'react-router';
import { FILTERS_KEYS } from '@/consts/filtersConsts';

export function AllProductsLink({
  className,
  children,
  ...props
}: Omit<NavLinkProps, 'className' | 'to'> & { className: string }) {
  const [searchParams] = useSearchParams();

  const noCategory = !searchParams.get(FILTERS_KEYS.CATEGORY);

  return (
    <NavLink
      to={'/products'}
      {...props}
      className={({ isActive }) => (isActive && noCategory ? className : '')}
    >
      {children}
    </NavLink>
  );
}
