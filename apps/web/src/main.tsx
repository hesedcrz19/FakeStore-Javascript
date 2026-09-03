import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from './context/ThemeContext';
import { SkeletonTheme } from 'react-loading-skeleton';
import App from './App.js';
import { ModalContextProvider } from './context/ModalContext';

createRoot(document.getElementById('root') ?? document.body).render(
  <StrictMode>
    <BrowserRouter>
      <SkeletonTheme
        baseColor="var(--skeleton-color)"
        highlightColor="var(--skeleton-highlight-color)"
      >
        <ThemeProvider>
          <ModalContextProvider>
            <App />
          </ModalContextProvider>
        </ThemeProvider>
      </SkeletonTheme>
    </BrowserRouter>
  </StrictMode>
);
