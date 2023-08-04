"use client"

import { FaShoppingCart } from 'react-icons/fa'

import { useEffect } from 'react'

import { useSelector, useDispatch, selectShop, shopSlice } from '@/lib/redux'

type Product = {
  id: string,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
}

type CartItem = {
  product: Product,
  quantity: number,
}

export default function CartPage() {
  const cartItems = useSelector(selectShop).cart
  const dispatch = useDispatch()



  // const handleRemoveItem = (item: CartItem) => {
  //   dispatch(shopSlice.actions.removeFromCart(item.product))
  // }

  // handleRemoveItem with localStorage
  const handleRemoveItem = (item: CartItem) => {
    dispatch(shopSlice.actions.removeFromCart(item.product))
    const localCart = localStorage.getItem('cart');
    //  modify localCart
    const modifiedCart = JSON.parse(localCart).filter((cartItem: Product) => cartItem.id !== item.product.id);
    localStorage.setItem('cart', JSON.stringify(modifiedCart));
  }

  // const cartItemList = cartItems.reduce((acc, item) => {
  //   const filteredItem = acc.find(i => i.product.id === item.id)
  //   if (filteredItem) {
  //     filteredItem.quantity += 1
  //   } else {
  //     acc.push({
  //       product: item,
  //       quantity: 1,
  //     })
  //   }
  //   return acc
  // }, [] as CartItem[])

  // cartItemList with localStorage
  const cartItemList = cartItems.reduce((acc, item) => {
    const filteredItem = acc.find(i => i.product.id === item.id)
    if (filteredItem) {
      filteredItem.quantity += 1
    } else {
      acc.push({
        product: item,
        quantity: 1,
      })
    }
    return acc
  }, [] as CartItem[])

  useEffect(() => {
    const cart = localStorage.getItem('cart') || '[]';
    if (cart) {
      dispatch(shopSlice.actions.setCart(JSON.parse(cart)));
    }
  }, []);

  return (
    <div>
      <h1>Cart Page</h1>
      {cartItemList.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItemList.map((item, index) => (
            <li key={item.product.id + index + 4} className="flex items-center py-4 border-b">
              <div className="flex items-center flex-1">
                <div className="flex-shrink-0">
                  <img src={item.product.image} alt={item.product.title} className="w-16 h-16 rounded-md" />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-medium text-gray-900">{item.product.title}</h2>
                  <p className="text-sm text-gray-500">${item.product.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-lg font-medium text-gray-900 mr-4">{item.quantity}</p>
                <button onClick={() => handleRemoveItem(item)} className="text-red-500 hover:text-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <FaShoppingCart className="inline-block mr-2" />
        Checkout
      </button>
    </div>
  )
}