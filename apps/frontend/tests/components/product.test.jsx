import { Product } from '@/components/Product/Product';
import { formatProduct } from '@/utils/formatProducts';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, it, expect } from 'vitest';

const product2 = formatProduct({
  id: 2,
  title: 'Product2',
  slug: 'product2',
  price: 20,
  images: ['img', 'img', 'img'],
});

const expectCarrousel = async (length) => {
  expect(await screen.findAllByRole('button', { name: /see image/i })).toHaveLength(length);
  expect(await screen.findByRole('group')).toBeInTheDocument();
  expect(await screen.findAllByRole('radio')).toHaveLength(length);
  expect(await screen.findByRole('button', { name: /previous slide/i })).toBeInTheDocument();
  expect(await screen.findByRole('button', { name: /next slide/i })).toBeInTheDocument();
};

const setup = ({ state, slug }) =>
  render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: '/',
          state,
        },
      ]}
    >
      <Product slug={slug} />
    </MemoryRouter>
  );

describe('Product test', () => {
  it('Should fetch the product1', async () => {
    setup({ slug: 'product1' });
    expect(await screen.findByRole('heading', { level: 2 })).toHaveTextContent(/product1/i);
    await expectCarrousel(3);
  });

  it('Should render the product2 in the state', async () => {
    setup({
      state: { product: product2 },
      slug: 'product2',
    });
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/product2/i);
    await expectCarrousel(3);
  });

  it('Should fetch the product1 with the product2 in the state', async () => {
    setup({
      state: { product: product2 },
      slug: 'product1',
    });
    expect(await screen.findByRole('heading', { level: 2 })).toHaveTextContent(/product1/i);
    await expectCarrousel(3);
  });
});
