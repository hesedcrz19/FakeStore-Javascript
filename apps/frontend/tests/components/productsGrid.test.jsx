import { escapeRegExp } from '@/utils/escapeRegExp.js';
import { ProductsGrid } from '@/Layouts/ProductsGrid/ProductsGrid.jsx';
import { formatProduct } from '@/utils/formatProducts.js';
import { getByText, getByRole, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { it, expect, describe } from 'vitest';

const products = [
  {
    id: 1,
    title: 'Product1',
    slug: 'product1',
    price: 10,
  },
  {
    id: 2,
    title: 'Product2',
    slug: 'product2',
    price: 20,
  },
  {
    id: 3,
    title: 'Product3',
    slug: 'product3',
    price: 30,
  },
  {
    id: 4,
    title: 'Product4',
    slug: 'product4',
    price: 40,
  },
].map((p) => formatProduct(p));

const setup = ({ products = [], loading = false } = {}) =>
  render(
    <MemoryRouter>
      <ProductsGrid products={products} loading={loading} />
    </MemoryRouter>
  );

describe('ProductsGrid tests', () => {
  it('Should not found the products', () => {
    setup();
    expect(screen.getByRole('heading', { name: /no products found/i })).toBeInTheDocument();
  });

  it('Should render the skeletons loadings', () => {
    setup({ loading: true });
    expect(screen.getAllByRole('article')).toHaveLength(24);

    products.forEach((p) => {
      expect(screen.queryByRole('heading', { name: p.title })).not.toBeInTheDocument();
      expect(screen.queryByText(new RegExp(p.price))).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: /see more about/i })).not.toBeInTheDocument();
    });
  });

  it('Should render the products', async () => {
    setup({ products });
    const productCards = screen.getAllByRole('article');

    products.forEach((p, i) => {
      const linkRegExp = new RegExp(`see more about ${escapeRegExp(p.title.fullContent)}`, 'i');

      expect(
        getByRole(productCards[i], 'heading', { name: escapeRegExp(p.title.content) })
      ).toBeInTheDocument();
      expect(getByText(productCards[i], new RegExp(escapeRegExp(p.price)))).toBeInTheDocument();
      expect(getByRole(productCards[i], 'link', { name: linkRegExp })).toBeInTheDocument();
    });
  });
});
