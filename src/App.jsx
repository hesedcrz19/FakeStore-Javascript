import { Header } from "./components/Header.jsx";
import { Products } from "./pages/Products.jsx";
import { Footer} from "./components/Footer.jsx";

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
