import styles from './ThemeButton.module.css';
import { useEffect, useState, useRef, useId } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Desktop } from '../icons/Desktop';
import { Sun } from '../icons/Sun';
import { Moon } from '../icons/Moon';
import { THEMES } from '@/consts/themesConst';
import type { Theme } from '@/types/themesTypes';
import { AnimatePresence, motion, stagger, type Variants } from 'motion/react';

const themes = [
  {
    label: 'Light',
    theme: THEMES.LIGHT,
    svg() {
      return <Sun />;
    },
  },
  {
    label: 'Dark',
    theme: THEMES.DARK,
    svg() {
      return <Moon />;
    },
  },
  {
    label: 'System',
    theme: THEMES.SYSTEM,
    svg() {
      return <Desktop />;
    },
  },
];

const popoverVariants: Variants = {
  hidden: {
    opacity: 0.3,
    scale: 1,
    y: -10,
    transition: {
      delay: 0,
      duration: 0.05,
      when: 'afterChildren',
      delayChildren: stagger(0.05, { from: 'last' }),
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.05,
      when: 'beforeChildren',
      delayChildren: stagger(0.05),
    },
  },
};
const themesVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -5,
    transition: { duration: 0.08 },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.08 },
  },
};

export function ThemeButton({
  containerClassName = '',
  buttonClassName = '',
  dialogDirection = 'down',
}) {
  const popoverId = useId();
  const { themeMode, setThemeMode } = useTheme();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!popoverOpen || !popoverRef.current) return;

    const handlerClick = (e: PointerEvent) => {
      if (e.target === popoverRef.current) return;
      setPopoverOpen(false);
    };

    document.body.addEventListener('click', handlerClick);

    return () => {
      document.body.removeEventListener('click', handlerClick);
    };
  }, [popoverOpen]);

  const handlerClick = (theme: Theme) => {
    setThemeMode(theme);
    setPopoverOpen(false);
  };

  return (
    <div className={`${styles.container} ${containerClassName}`}>
      <AnimatePresence mode="popLayout">
        <motion.button
          aria-label="Change theme"
          key={themeMode}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.2 }}
          className={`${styles.button} ${buttonClassName}`}
          onClick={(e) => {
            e.stopPropagation();
            setPopoverOpen((prev) => !prev);
          }}
        >
          {themeMode === 'light' ? (
            <Sun className={styles.sun} />
          ) : themeMode === 'dark' ? (
            <Moon className={styles.moon} />
          ) : (
            <Desktop className={styles.desktop} />
          )}
        </motion.button>

        {popoverOpen && (
          <motion.article
            key={popoverId}
            ref={popoverRef}
            variants={popoverVariants}
            exit={'hidden'}
            initial={'hidden'}
            animate={'visible'}
            className={`${styles.popover} ${styles[dialogDirection]}`}
          >
            {themes.map((theme) => (
              <motion.button
                key={theme.theme}
                aria-label={theme.label}
                onClick={() => handlerClick(theme.theme)}
                variants={themesVariants}
              >
                <theme.svg />
                {theme.label}
              </motion.button>
            ))}
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}
