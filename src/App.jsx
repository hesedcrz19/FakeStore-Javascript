import { Header } from "./Layouts/Header/Header.jsx";
import { Products } from "./pages/Products/Products.jsx";
import { Home } from "./pages/Home/Home.jsx";
import { Footer} from "./Layouts/Footer/Footer.jsx";

import { Router } from "./components/Router.jsx";

function App() {
  return (
    <>
      <Header />
      <Router route="/products" component={Products} />
      <Router route="/" component={Home} />
      <Footer />
    </>
  )
}

export default App