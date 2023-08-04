import { useState, useEffect, SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { shopSlice, useSelector } from '@/lib/redux';
import { useRouter } from 'next/navigation';

type Product = {
  id: string,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
}

// import { Product } from '@/types';
import Link from 'next/link';


const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter()
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const cart = useSelector(state => state.shop.cart);

  // const handleAddToCart = () => {
  //   setIsAddingToCart(true);
  //   dispatch(shopSlice.actions.addToCart(product));
  //   setTimeout(() => {
  //     setIsAddingToCart(false);
  //   }, 1000);
  // };


  // handleAddToCart with localStorage
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

  const handleCheckout = (e: SyntheticEvent) => {
    e.stopPropagation();
    router.push('/cart');
  }

  useEffect(() => {
    const count = cart.reduce((acc, item) => {
      if (item.id === product.id) {
        return acc + 1;
      }
      return acc;
    }, 0);
    setCartCount(count);
  }
    , [cart]);

  return (
    <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="bg-gray-200 h-48 w-full flex items-center justify-center">
        <img src={product.image} alt={product.name} className="h-32 w-32 object-contain" />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
        <p className="mt-2 text-gray-600">{product.description}</p>
        <p className="mt-2 text-gray-800">${product.price.toFixed(2)}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="relative">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? 'Adding to Cart...' : `Add to Cart ${cartCount > 0 ? `(${cartCount})` : ''}`}
            </button>
          </div>
          <div
            onClick={handleCheckout}
          >
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"

            >
              Checkout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;