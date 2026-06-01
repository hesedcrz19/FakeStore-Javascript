import { NavLink as RRNavLink } from 'react-router';

export function NavLink({ href, ...restProps }) {
  return <RRNavLink to={href} {...restProps} />;
}
