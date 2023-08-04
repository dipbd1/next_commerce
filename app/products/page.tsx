
"use client"
import Link from 'next/link';
import { useSelector, selectShop, useDispatch, fetchProductsAsync, shopSlice } from '@/lib/redux';
import { useEffect } from 'react';

import ProductCard from '../components/Product/Product';
import { useRouter } from 'next/navigation';

export default function CartPage() {

  const router = useRouter();
  const dispatch = useDispatch();
  const products = useSelector(selectShop).products;

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, []);

  useEffect(() => {
    const cart = localStorage.getItem('cart') || '[]';
    if (cart) {
      dispatch(shopSlice.actions.setCart(JSON.parse(cart)));
    }
  }, []);



  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product: any) => (
            <div  className='cursor-pointer' key={product.id} onClick={
              () => {
                // go to product page
                router.push('/products/' + product.id);
              }
            } >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}