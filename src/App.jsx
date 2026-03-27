import { Header } from "./Layouts/Header/Header.jsx";
import { Products } from "./pages/Products/Products.jsx";
import { Home } from "./pages/Home/Home.jsx";
import { Footer } from "./Layouts/Footer/Footer.jsx";

import { ProductsProvider } from "./context/ProductsContext.jsx";
import { Route, Routes } from "react-router";

function App() {
  return (
    <>
      <Header />
      <ProductsProvider>
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<h2>404</h2>} />
        </Routes>
      </ProductsProvider>
      <Footer />
    </>
  );
}

export default App;
