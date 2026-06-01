import { lazy } from 'react';

import { useRouter } from './hooks/useRoute.js';

import { AppLayout } from './AppLayout.jsx';

const Home = lazy(() => import('./pages/Home/Home.jsx'));
const Products = lazy(() => import('./pages/Products/Products.jsx'));
const Page404 = lazy(() => import('./pages/Page404/Page404.jsx'));
const ModalProduct = lazy(
  () => import('./pages/ModalProduct/ModalProduct.jsx')
);
const ProductPage = lazy(() => import('./pages/ProductPage/ProductPage.jsx'));

import { Route, Routes } from 'react-router';

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
