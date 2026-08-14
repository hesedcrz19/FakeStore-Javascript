import { NavLink, type NavLinkProps, type Path, useSearchParams } from 'react-router';
import { FILTERS_KEYS } from '@/consts/filtersConsts';

export function CategoryLink({
  to,
  className,
  children,
  ...props
}: Omit<NavLinkProps, 'to' | 'className'> & { to: Partial<Path>; className: string }) {
  const [searchParams] = useSearchParams();
  const toSearchParams = new URLSearchParams(to.search);

  const correctCategory =
    searchParams.get(FILTERS_KEYS.CATEGORY) === toSearchParams.get(FILTERS_KEYS.CATEGORY);

  return (
    <NavLink
      {...props}
      to={to}
      className={({ isActive }) => (isActive && correctCategory ? className : '')}
    >
      {children}
    </NavLink>
  );
}
