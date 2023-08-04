import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk'
import { fetchProducts } from './shopThunkActions'

type Product = {
  id: string,
  title: string,
  price: number,
  category: string,
  description: string,
  image: string,
}

export const fetchProductsAsync = createAppAsyncThunk(
  'shop/fetchProducts',
  async () => {
    const response = await fetchProducts()
    return response
  }
)