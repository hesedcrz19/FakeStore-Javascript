import { Product } from '@/components/Product/Product';
import type { FormattedProduct } from '@/types/formattedProduct';
import { formatProduct } from '@/utils/formatProducts';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, it, expect } from 'vitest';

const product2 = formatProduct({
  id: crypto.randomUUID(),
  title: 'Product2',
  slug: 'product2',
  price: 10,
  images: ['1', '2', '3'],
  originalPrice: 10,
  discount: 0,
  discountPercentage: 0,
  promotion: null,
  shippingCost: 0,
  rating: 5,
  description: 'Description 2',
  category: {
    id: crypto.randomUUID(),
    name: 'Clothes',
    slug: 'clothes',
    image: 'img',
    updatedAt: '10/10/10',
    createdAt: '10/10/10',
  },
  updatedAt: '10/10/10',
  createdAt: '10/10/10',
});

const expectCarrousel = async (length: number) => {
  expect(await screen.findAllByRole('button', { name: /see image/i })).toHaveLength(length);
  expect(await screen.findByRole('group')).toBeInTheDocument();
  expect(await screen.findAllByRole('radio')).toHaveLength(length);
  expect(await screen.findByRole('button', { name: /previous slide/i })).toBeInTheDocument();
  expect(await screen.findByRole('button', { name: /next slide/i })).toBeInTheDocument();
};

const setup = ({ state, slug }: { state?: { product: FormattedProduct }; slug: string }) =>
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
