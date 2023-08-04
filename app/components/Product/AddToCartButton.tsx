"use client"

import { SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector, selectShop, shopSlice } from '@/lib/redux';



export default function AddToCartButton({ product }) {

  const dispatch = useDispatch();
  const [isAddingToCart, setIsAddingToCart] = useState(false);


  const handleAddToCart = (e: SyntheticEvent) => {
    e.stopPropagation();
    setIsAddingToCart(true);
    dispatch(shopSlice.actions.addToCart(product));
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
    const localCart = localStorage.getItem('cart') || '[]';
    //  modify localCart
    const modifiedCart = JSON.parse(localCart);
    modifiedCart.push(product);
    localStorage.setItem('cart', JSON.stringify(modifiedCart));
  };

  return <button
    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    onClick={handleAddToCart}
    disabled={isAddingToCart}
  >
    {isAddingToCart ? 'Adding to cart...' : 'Add to cart'}
  </button>
}