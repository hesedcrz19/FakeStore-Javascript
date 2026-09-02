import { Header } from './Layouts/Header/Header';
import { Footer } from './Layouts/Footer/Footer';
import { Outlet } from 'react-router';
import { useEffect } from 'react';
import { useCategoriesStore } from './stores/categoriesStore';
import { Toaster } from 'sonner';

export function AppLayout() {
  const { fetchCategories } = useCategoriesStore();
  useEffect(() => {
    void fetchCategories();
  }, [fetchCategories]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />

      <Toaster
        toastOptions={{
          style: {
            boxShadow: 'var(--small-shadow)',
            padding: '8px',
            backgroundColor: 'var(--bg-color)',
            border: 'none',
            color: 'var(--text-color)',
          },
        }}
      />
    </>
  );
}
