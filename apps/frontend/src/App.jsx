import { Route, Routes } from 'react-router';
import { useRouter } from './hooks/useRoute.js';
import { AppLayout } from './AppLayout.jsx';
import { lazy } from 'react';
const Home = lazy(() => import('./pages/Home/Home.jsx'));
const Products = lazy(() => import('./pages/Products/Products.jsx'));
const Page404 = lazy(() => import('./pages/Page404/Page404.jsx'));
const ProductPage = lazy(() => import('./pages/ProductPage/ProductPage.jsx'));
import ModalProduct from './pages/ModalProduct/ModalProduct.jsx';

function App() {
  const { location } = useRouter();
  const { backgroundLocation } = location.state || {};

  return (
    <>
      <AppLayout>
        <Routes location={backgroundLocation || location}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>

        {backgroundLocation && (
          <Routes>
            <Route path="/products/:slug" element={<ModalProduct />} />
          </Routes>
        )}
      </AppLayout>
    </>
  );
}

export default App;
