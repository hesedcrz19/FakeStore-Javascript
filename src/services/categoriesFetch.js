export async function categoriesFetch() {
  const data = await fetch(
    'https://api.escuelajs.co/api/v1/categories?limit=5&offset=0'
  );
  if (!data.ok) throw new Error('A error ocurre fetching the categories');
  return await data.json();
}
