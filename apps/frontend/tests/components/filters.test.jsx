import { describe, expect, it } from 'vitest';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FiltersButton } from '@/components/FiltersButton/FiltersButton';
import { FiltersProvider } from '@/context/FiltersContext';
import { MemoryRouter } from 'react-router';

const setup = ({ search } = {}) =>
  render(
    <MemoryRouter initialEntries={[{ pathname: '/', search }]}>
      <FiltersProvider>
        <FiltersButton />
      </FiltersProvider>
    </MemoryRouter>
  );

describe('filters test', () => {
  it('Should open and close the filters modal', async () => {
    setup();
    const user = userEvent.setup();

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    const openButton = screen.getByRole('button', { name: /open filters/i });
    await user.click(openButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close filters/i });
    await user.click(closeButton);

    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('Should change the search input', async () => {
    setup({ search: '?search=Red' });
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /filters/i }));

    const searchInput = screen.getByRole('searchbox');

    expect(searchInput).toHaveValue('Red');
    await user.clear(searchInput);
    expect(searchInput).toHaveValue('');
    await user.type(searchInput, 'Orange');
    expect(searchInput).toHaveValue('Orange');
  });

  it('Should change de min price and max price input', async () => {
    setup({ search: '?minPrice=1&maxPrice=10' });
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /filters/i }));

    const minPriceInput = screen.getByRole('textbox', { name: /min/i });
    const maxPriceInput = screen.getByRole('textbox', { name: /max/i });

    await user.type(minPriceInput, 'a 12 .  3 . b 4 5');
    expect(minPriceInput).toHaveValue('112.34');

    await user.type(maxPriceInput, 'a 12 .  3 . b 4 5');
    expect(maxPriceInput).toHaveValue('1012.34');
  });

  it('Should checked the furniture category', async () => {
    setup({ search: '?category=shoes' });
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /filters/i }));

    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(4);

    const shoesRadio = screen.getByRole('radio', { name: /shoes/i });
    const furnitureRadio = screen.getByRole('radio', { name: /furniture/i });

    expect(shoesRadio).toBeChecked();
    expect(furnitureRadio).not.toBeChecked();

    await user.click(furnitureRadio);

    expect(shoesRadio).not.toBeChecked();
    expect(furnitureRadio).toBeChecked();
  });
});
