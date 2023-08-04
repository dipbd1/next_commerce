type Product = {
  id: string,
  title: string,
  price: number,
  category: string,
  description: string,
  image: string,
}

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`https://fakestoreapi.com/products`)
  const result = await response.json()
  return result
}

export const fetchAllCategories = async (): Promise<string[]> => {
  const response = await fetch(`https://fakestoreapi.com/products/categories`)
  const result = await response.json()
  return result
}

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const response = await fetch(`https://fakestoreapi.com/products/category/${category}`)
  const result = await response.json()
  return result
}
