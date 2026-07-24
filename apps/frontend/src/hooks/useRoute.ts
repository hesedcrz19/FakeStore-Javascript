import { useNavigate, useLocation, useSearchParams } from 'react-router';

export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  return {
    location,
    navigate,
    searchParams,
    setSearchParams,
  };
}
