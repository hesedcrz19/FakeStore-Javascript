import { Route, Routes, useLocation } from 'react-router';
import { AppLayout } from './AppLayout';
import { lazy } from 'react';
const Home = lazy(() => import('./pages/Home/Home'));
const Products = lazy(() => import('./pages/Products/Products'));
const ProductPage = lazy(() => import('./pages/ProductPage/ProductPage'));
const Page404 = lazy(() => import('./pages/Page404/Page404'));
import ProductModal from './pages/ProductModal/ProductModal';

function App() {
  const { state } = useLocation() as { state?: { backgroundLocation?: string } };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductPage />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/products/:slug" element={<ProductModal />} />
        </Routes>
      )}
    </>
  );
}

export default App;
