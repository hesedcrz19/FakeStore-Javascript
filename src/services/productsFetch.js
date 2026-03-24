const FILTERS = {
  minPrice: "price_min",
  maxPrice: "price_max",
  search: "title",
  category: "categorySlug",
};

const CATEGORIES = {
  all: "",
  clothes: "clothes",
  electronics: "electronics",
  furniture: "furniture",
  shoes: "shoes",
  miscellaneous: "miscellaneous",
};

export async function productsFetch(filters = {}) {
  const url = new URL(`https://api.escuelajs.co/api/v1/products`);

  const { minPrice, maxPrice, search, category } = filters;

  url.searchParams.append(FILTERS.minPrice, minPrice || "1");
  url.searchParams.append(FILTERS.maxPrice, maxPrice || "10000");
  url.searchParams.append(FILTERS.search, search ?? '');
  url.searchParams.append(FILTERS.category, CATEGORIES[category] ?? '');

  const data = await fetch(url);
  if (!data.ok) throw new Error("A error ocurre fetching the products");
  return await data.json();
}
