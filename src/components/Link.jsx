import { Link as NavLink } from "react-router";

export function Link({ href, target, ...restProps }) {
  return (
    <NavLink to={href} {...restProps} />
  );
}
