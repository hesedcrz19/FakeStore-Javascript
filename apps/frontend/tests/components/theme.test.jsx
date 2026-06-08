import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/context/ThemeContext';
import { ThemeButton } from '@/components/ThemeButton/ThemeButton';

const setup = () =>
  render(
    <ThemeProvider>
      <ThemeButton />
    </ThemeProvider>
  );

describe('Theme tests', () => {
  it('Should open and close the modal', async () => {
    setup();
    const user = userEvent.setup();

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', /change theme/i));
    expect(screen.queryByRole('dialog')).toBeInTheDocument();
    screen.getByRole('dialog').close();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('Should check that the theme is system', async () => {
    setup();
    expect(localStorage.getItem('theme')).toBe('system');
  });

  it('Should change the theme to light', async () => {
    setup();
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /change theme/i }));
    await user.click(screen.getByRole('button', { name: /light/i }));
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
