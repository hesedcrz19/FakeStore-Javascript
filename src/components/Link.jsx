import { useRouter } from "../hooks/useRoute.js";

export function Link({ href, target, ...restProps }) {
  const { navigateTo } = useRouter();

  const handleLink = (event) => {
    
    const isMainEvent = event.button === 0;
    const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
    const isManageabledEvent = target === undefined || target === '_self';
    
    if (isMainEvent && isManageabledEvent && !isModifiedEvent) {
      event.preventDefault();
      navigateTo(href);
    }

  };

  return (
    <a href={href} target={target} {...restProps} onClick={handleLink} />
  );
}
