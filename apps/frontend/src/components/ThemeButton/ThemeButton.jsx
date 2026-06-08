import styles from './ThemeButton.module.css';

import { useRef } from 'react';
import { useModal } from '@/hooks/useModal.js';
import { useTheme } from '@/context/ThemeContext';

import { Desktop } from '../icons/Desktop';
import { Sun } from '../icons/Sun';
import { Moon } from '../icons/Moon';

export function ThemeButton({ dialogDirection = 'down' }) {
  const dialogRef = useRef(null);
  const { openModal, closeModal } = useModal({
    dialogRef,
    hiddenScrollbar: false,
  });
  const { themeMode, setThemeMode } = useTheme();

  const handleClick = (theme) => {
    setThemeMode(theme);
    closeModal();
  };

  return (
    <>
      <button
        aria-label="change theme"
        className={`${styles.button} ${styles[themeMode]}`}
        onClick={openModal}
      >
        <Sun className={styles.sun} />
        <Moon className={styles.moon} />
        <Desktop className={styles.desktop} />
      </button>

      <dialog ref={dialogRef} className={`${styles.dialog} ${styles[dialogDirection]}`}>
        <div className={styles.dialogFlex}>
          <button aria-label="light" onClick={() => handleClick('light')}>
            <Sun />
            Light
          </button>
          <button aria-label="dark" onClick={() => handleClick('dark')}>
            <Moon />
            Dark
          </button>
          <button aria-label="system" onClick={() => handleClick('system')}>
            <Desktop />
            System
          </button>
        </div>
      </dialog>
    </>
  );
}
