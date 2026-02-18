import { useRouter } from "../hooks/useRoute";

export function Router({ route, component: Component}){
  const {currentPath} = useRouter();

  if (route !== currentPath) return null;
  
  return <Component />;
}