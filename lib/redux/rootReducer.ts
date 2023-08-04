/* Instruments */
import { counterSlice } from './slices'
import { shopSlice } from './slices'

export const reducer = {
  counter: counterSlice.reducer,
  shop: shopSlice.reducer,
}
