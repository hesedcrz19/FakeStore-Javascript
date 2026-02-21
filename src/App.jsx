import { Header } from "./Layouts/Header.jsx";
import { Products } from "./pages/Products/Products.jsx";
import { Footer} from "./Layouts/Footer.jsx";

import { Router } from "./components/Router.jsx";

function App() {
  return (
    <>
      <Header />
      <Router route="/products" component={Products} />
      <Footer />
    </>
  )
}

export default App
