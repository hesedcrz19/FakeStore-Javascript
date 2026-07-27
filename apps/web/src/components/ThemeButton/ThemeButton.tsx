import styles from './ThemeButton.module.css';

import { useRef } from 'react';
import { useModal } from '@/hooks/useModal';
import { useTheme } from '@/context/ThemeContext';

import { Desktop } from '../icons/Desktop';
import { Sun } from '../icons/Sun';
import { Moon } from '../icons/Moon';
import { THEMES } from '@/consts/themesConst';
import type { Theme } from '@/types/themesTypes';

export function ThemeButton({ dialogDirection = 'down' }) {
  const dialogRef = useRef(null);
  const { openModal, closeModal } = useModal({
    dialogRef,
    hiddenScrollbar: false,
  });
  const { themeMode, setThemeMode } = useTheme();

  const handleClick = (theme: Theme) => {
    setThemeMode(theme);
    closeModal();
  };

  return (
    <>
      <button
        aria-label="Change theme"
        className={`${styles.button} ${styles[themeMode]}`}
        onClick={openModal}
      >
        <Sun className={styles.sun} />
        <Moon className={styles.moon} />
        <Desktop className={styles.desktop} />
      </button>

      <dialog ref={dialogRef} className={`${styles.dialog} ${styles[dialogDirection]}`}>
        <div className={styles.dialogFlex}>
          <button aria-label="Light" onClick={() => handleClick(THEMES.LIGHT)}>
            <Sun />
            Light
          </button>
          <button aria-label="Dark" onClick={() => handleClick(THEMES.DARK)}>
            <Moon />
            Dark
          </button>
          <button aria-label="System" onClick={() => handleClick(THEMES.SYSTEM)}>
            <Desktop />
            System
          </button>
        </div>
      </dialog>
    </>
  );
}
