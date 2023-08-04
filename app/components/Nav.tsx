'use client'

/* Core */
import Link from 'next/link'
import { usePathname } from 'next/navigation'


import dynamic from 'next/dynamic'
const FaShoppingCart = dynamic(() => import('react-icons/fa').then((mod) => mod.FaShoppingCart))

import { useSelector, selectShop } from '@/lib/redux'

/* Instruments */
import styles from '../styles/layout.module.css'

export const Nav = () => {
  const pathname = usePathname()

  const cartItems = useSelector(selectShop).cart

  return (
    <nav className={styles.nav}>
      <Link
        className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}
        href="/"
      >
        Home
      </Link>
      {/* for cart */}
      <Link className={`${styles.link} ${pathname === '/products' ? styles.active : ''
        }`}
        href="/products"
      >Products</Link>
      {/* <Link
        className={`${styles.link} ${pathname === '/cart' ? styles.active : ''
          }`}
        href="/cart"
      >
        Cart
      </Link> */}
      <div className="relative">

        <Link className={`${styles.link} ${pathname === '/cart' ? styles.active : ''}`} href="/cart">
          <FaShoppingCart className="text-2xl" />
          {cartItems.length > 0 && (
            <span className="absolute bottom-3 left-5 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm">
              {cartItems.length}
            </span>
          )}
        </Link>

      </div>
      {/* delete later */}
      {/* <Link
        className={`${styles.link} ${pathname === '/verify' ? styles.active : ''
          }`}
        href="/verify"
      >
        Verify
      </Link> */}
    </nav>
  )
}
