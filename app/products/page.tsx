
"use client"
import Link from 'next/link';
import { useSelector, selectShop, useDispatch, fetchProductsAsync, shopSlice, fetchAllCategoriesAsync, fetchProductsByCategoryAsync } from '@/lib/redux';
import { useEffect, useState } from 'react';

import ProductCard from '../components/Product/Product';
import { useRouter } from 'next/navigation';

export default function CartPage() {

  const router = useRouter();
  const [sortOrder, setSortOrder] = useState('asc');
  const dispatch = useDispatch();
  const products = useSelector(selectShop).products;
  const categories = useSelector(selectShop).categories;
  const status = useSelector(selectShop).status;

  const [_products, setProducts] = useState(products);

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    const sortedProducts = [...products].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    }
    );
    setProducts(sortedProducts);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    if (category === 'all') {
      dispatch(fetchProductsAsync())
    }
    else {
      dispatch(fetchProductsByCategoryAsync(category));
    }
  }

  useEffect(() => {
    dispatch(fetchAllCategoriesAsync()).then(() => {
      dispatch(fetchProductsAsync());
    });
  }, []);

  useEffect(() => {
    const cart = localStorage.getItem('cart') || '[]';
    if (cart) {
      dispatch(shopSlice.actions.setCart(JSON.parse(cart)));
    }
  }, []);

  useEffect(() => {
    setProducts(products);
  }, [products]);



  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSortOrderChange}
        >
          {sortOrder === 'asc' ? 'Sort by Price (Low to High)' : 'Sort by Price (High to Low)'}
        </button>
        <select className="block w-1/8 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onChange={handleCategoryChange}
        >
          <option value="all">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        {status == 'loading' && <div className="flex justify-center items-center">
          <div className="w-60 h-60 border-1 border-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-spin shadow-lg"></div>
        </div>}
        {status == 'idle' && <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {_products.map((product: any, index: number) => (
            <div className='cursor-pointer' key={product.id} onClick={
              () => {
                // go to product page
                router.push('/products/' + product.id);
              }
            } >
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
}