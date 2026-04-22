export async function productFetch(slug) {
  const res = await fetch(
    `https://api.escuelajs.co/api/v1/products/slug/${slug}`
  );
  if (!res.ok) throw new Error('Error fetching the product');
  return await res.json();
}
