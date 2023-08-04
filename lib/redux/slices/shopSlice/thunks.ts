import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk'
import { fetchProducts, fetchAllCategories, fetchProductsByCategory } from './shopThunkActions'

// type Product = {
//   id: string,
//   title: string,
//   price: number,
//   category: string,
//   description: string,
//   image: string,
// }

export const fetchProductsAsync = createAppAsyncThunk(
  'shop/fetchProducts',
  async () => {
    const response = await fetchProducts()
    return response
  }
)

export const fetchAllCategoriesAsync = createAppAsyncThunk(
  'shop/fetchAllCategories',
  async () => {
    const response = await fetchAllCategories()
    return response;
  }
)

export const fetchProductsByCategoryAsync = createAppAsyncThunk(
  'shop/fetchProductsByCategory',
  async (category: string) => {
    const response = await fetchProductsByCategory(category)
    return response;
  }
)