import { Header } from './Layouts/Header/Header';
import { Footer } from './Layouts/Footer/Footer';

export function AppLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
