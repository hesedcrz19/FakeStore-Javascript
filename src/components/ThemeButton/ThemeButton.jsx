import styles from "./ThemeButton.module.css";

import { useRef, useState, useEffect } from "react";
import { useModal } from "@/hooks/useModal.js";
import { useMatchMedia } from "@/hooks/useMatchMedia.js";

import { Desktop } from "../icons/Desktop";
import { Sun } from "../icons/Sun";
import { Moon } from "../icons/Moon";

export function ThemeButton({ dialogDirection = 'down'}) {
  const dialogRef = useRef(null);
  const { openModal } = useModal({
    dialogRef,
    hideScrollbar: false,
  });

  const systemDark = useMatchMedia("(prefers-color-scheme: dark)");
  const [ themeMode, setThemeMode ] = useState(() => localStorage.getItem('theme') ?? 'system');

  useEffect(() => {
    localStorage.setItem('theme', themeMode);
    
    if (themeMode === 'system'){
      document.documentElement.dataset.theme = systemDark ? 'dark' : 'light'
    } else {
      document.documentElement.dataset.theme = themeMode;
    }
  }, [themeMode])

  useEffect(() => {
    if (themeMode !== 'system') return

    document.documentElement.dataset.theme = systemDark ? 'dark' : 'light';
  }, [systemDark])

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
          <button aria-label="light" onClick={() => setThemeMode('light')}>
            <Sun/>
            Light
          </button>
          <button aria-label="dark" onClick={() => setThemeMode('dark')}>
            <Moon/>
            Dark
          </button>
          <button aria-label="system" onClick={() => setThemeMode('system')}>
            <Desktop/>
            System
          </button>
        </div>
      </dialog>
    </>
  );
}
