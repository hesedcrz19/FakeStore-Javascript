import { describe, expect, it } from 'vitest';
import {
  fireEvent,
  getAllByRole,
  getByRole,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FiltersButton } from '@/components/FiltersButton/FiltersButton';
import { FiltersProvider } from '@/context/FiltersContext';
import { MemoryRouter } from 'react-router';
import {
  FILTERS_KEYS,
  FREE_SHIPPING_TRUE,
  HAS_PROMOTION_TRUE,
  SORT_BY,
  SORT_ORDER,
} from '@/consts/filtersConsts';

const setup = ({ search }: { search?: string } = {}) =>
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
    setup({ search: `?${FILTERS_KEYS.SEARCH}=Red` });
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /filters/i }));

    const searchInput = screen.getByRole('searchbox', { name: /search/i });

    expect(searchInput).toHaveValue('Red');
    await user.clear(searchInput);
    expect(searchInput).toHaveValue('');
    await user.type(searchInput, 'Orange');
    expect(searchInput).toHaveValue('Orange');
  });

  it('Should change de min price and max price input', async () => {
    setup({ search: `?${FILTERS_KEYS.MIN_PRICE}=1&${FILTERS_KEYS.MAX_PRICE}=10` });
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /filters/i }));

    const minPriceInput = screen.getByRole('textbox', { name: /min/i });
    const maxPriceInput = screen.getByRole('textbox', { name: /max/i });

    await user.type(minPriceInput, 'a 12 .  3 . b 4 5');
    expect(minPriceInput).toHaveValue('112.34');

    await user.type(maxPriceInput, 'a 12 .  3 . b 4 5');
    expect(maxPriceInput).toHaveValue('1012.34');
  });

  it('Should change the sort by to rating', async () => {
    setup({ search: `?${FILTERS_KEYS.SORT_BY}=${SORT_BY.PRICE}` });
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /filters/i }));

    const sortBySelect = screen.getByRole('combobox', { name: /sort by/i });
    expect(sortBySelect).toHaveValue(SORT_BY.PRICE);

    const options = getAllByRole(sortBySelect, 'option');
    expect(options).toHaveLength(4);

    const ratingOption = getByRole(sortBySelect, 'option', { name: /rating/i });

    await user.selectOptions(sortBySelect, ratingOption);
    expect(sortBySelect).toHaveValue(SORT_BY.RATING);
  });

  it('Should change the sort order to descendant', async () => {
    setup({ search: `?${FILTERS_KEYS.SORT_ORDER}=${SORT_ORDER.ASC}` });
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /filters/i }));

    const sortOrderSelect = screen.getByRole('combobox', { name: /sort order/i });
    expect(sortOrderSelect).toHaveValue(SORT_ORDER.ASC);

    const options = getAllByRole(sortOrderSelect, 'option');
    expect(options).toHaveLength(2);

    const descendantOption = getByRole(sortOrderSelect, 'option', { name: /descendant/i });

    await user.selectOptions(sortOrderSelect, descendantOption);
    expect(sortOrderSelect).toHaveValue(SORT_ORDER.DESC);
  });

  it('Should change the min discount', async () => {
    setup({ search: `?${FILTERS_KEYS.MIN_DISCOUNT}=50` });
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /filters/i }));

    const slider = screen.getByRole('slider', { name: /min discount/i });
    expect(slider).toHaveValue('50');

    fireEvent.change(slider, { target: { value: '20' } });

    expect(slider).toHaveValue('20');
  });

  it('Should test the free shipping and has promotion filters', async () => {
    setup({
      search: `?${FILTERS_KEYS.FREE_SHIPPING}=${FREE_SHIPPING_TRUE}&${FILTERS_KEYS.HAS_PROMOTION}=${HAS_PROMOTION_TRUE}`,
    });
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /filters/i }));

    const freeShippingCheckbox = screen.getByRole('checkbox', { name: /free shipping/i });
    expect(freeShippingCheckbox).toBeChecked();
    const hasPromotionCheckbox = screen.getByRole('checkbox', { name: /has promotion/i });
    expect(hasPromotionCheckbox).toBeChecked();
  });
});
