import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from './context/ThemeContext';
import { SkeletonTheme } from 'react-loading-skeleton';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SkeletonTheme
        baseColor="var(--skeleton-color)"
        highlightColor="var(--skeleton-highlight-color)"
      >
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </SkeletonTheme>
    </BrowserRouter>
  </StrictMode>
);
