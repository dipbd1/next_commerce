import { ActionReducerMapBuilder, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchProductsAsync, fetchAllCategoriesAsync, fetchProductsByCategoryAsync } from "./thunks";


const initialState: ShopSliceState = {
  products: [],
  status: 'idle',
  error: null,
  cart: [],
  categories: []
}

export const shopSlice = createSlice({
  name: 'shop',
  initialState: initialState satisfies ShopSliceState as ShopSliceState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      state.cart.push(action.payload)
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      const index = state.cart.findIndex((cartItem) => cartItem.id === action.payload.id)
      let newCart = [...state.cart]

      if (index >= 0) {
        newCart.splice(index, 1)
      } else {
        console.warn(`Can't remove product (id: ${action.payload.id}) as it's not in the cart!`)
      }

      state.cart = newCart
    },
    setCart: (state, action: PayloadAction<Product[]>) => {
      state.cart = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.products = action.payload
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.categories = action.payload
      })
      .addCase(fetchAllCategoriesAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      }
      )
      .addCase(fetchProductsByCategoryAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProductsByCategoryAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.products = action.payload
      })
      .addCase(fetchProductsByCategoryAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

/* Types */
export interface ShopSliceState {
  products: [] | Product[],
  status: 'idle' | 'loading' | 'failed'
  error: string | null
  cart: Product[];
  categories: [] | string[];
}

type Product = {
  id: string,
  title: string,
  price: number,
  category: string,
  description: string,
  image: string,
}

