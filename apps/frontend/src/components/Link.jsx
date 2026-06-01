import { Link as RRLink } from 'react-router-dom';

export function Link({ href, state, ...restProps }) {
  return <RRLink to={href} state={state} {...restProps} />;
}
