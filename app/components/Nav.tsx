'use client'

/* Core */
import Link from 'next/link'
import { usePathname } from 'next/navigation'


import dynamic from 'next/dynamic'
// const FaShoppingCart = dynamic(() => import('react-icons/fa').then((mod) => mod.FaShoppingCart))
import { FaShoppingCart } from 'react-icons/fa'

import { useSelector, selectShop } from '@/lib/redux'

/* Instruments */
import styles from '../styles/layout.module.css'
import { use, useEffect, useState } from 'react'

export const Nav = () => {
  const pathname = usePathname()

  const [cart, setCart] = useState([])

  const cartItems = useSelector(selectShop).cart

  useEffect(() => {
    const cart = localStorage.getItem('cart') || '[]'
    if (cart) {
      setCart(JSON.parse(cart))
    }
  }, [])

  useEffect(() => {
    setCart(cartItems)
  }, [cartItems])

  return (
    <nav className={styles.nav}>
      <Link
        className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}
        href="/"
      >
        Home
      </Link>
      <Link className={`${styles.link} ${pathname === '/products' ? styles.active : ''
        }`}
        href="/products"
      >Shop</Link>
      <div className="relative">

        <Link className={`${styles.link} ${pathname === '/cart' ? styles.active : ''}`} href="/cart">
          <FaShoppingCart className="text-2xl" />
          {cart.length > 0 && (
            <span className="absolute bottom-3 left-5 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm">
              {cart.length}
            </span>
          )}
        </Link>

      </div>
    </nav>
  )
}
