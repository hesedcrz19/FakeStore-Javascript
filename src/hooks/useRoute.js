import { useNavigate, useLocation, useSearchParams } from "react-router";

export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const navigateTo = (href) => {
    navigate(href);
  };

  return {
    currentPath: location.pathname,
    navigateTo,
    searchParams,
  };
}
