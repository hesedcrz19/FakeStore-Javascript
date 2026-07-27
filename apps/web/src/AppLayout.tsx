import { Header } from './Layouts/Header/Header';
import { Footer } from './Layouts/Footer/Footer';
import { Outlet } from 'react-router';

export function AppLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
