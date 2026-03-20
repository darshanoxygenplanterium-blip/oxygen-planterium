'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

export default function BestSellers() {
  const [products, setProducts] = useState<any[]>([])
  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    async function fetchBestSellers() {
      const data = await client.fetch(`
        *[_type == "product" && bestSeller == true][0...8]{
          _id,
          name,
          slug,
          price,
          category,
          image
        }
      `)
      setProducts(data || [])
    }

    fetchBestSellers()
  }, [])

  // load cart
  useEffect(() => {
    const saved = localStorage.getItem('plant_cart')
    if (saved) setCart(JSON.parse(saved))
  }, [])

  // save cart
  useEffect(() => {
    localStorage.setItem('plant_cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(product: any) {
    const existing = cart.find((i) => i._id === product._id)

    if (existing) {
      setCart(
        cart.map((i) =>
          i._id === product._id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      )
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  function removeFromCart(product: any) {
    const existing = cart.find((i) => i._id === product._id)
    if (!existing) return

    if (existing.quantity === 1) {
      setCart(cart.filter((i) => i._id !== product._id))
    } else {
      setCart(
        cart.map((i) =>
          i._id === product._id
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
      )
    }
  }

  const totalItems = useMemo(
    () => cart.reduce((sum, i) => sum + i.quantity, 0),
    [cart]
  )

  return (
    <section
      id="products"
      className="py-16 scroll-mt-16 md:scroll-mt-20 bg-gradient-to-br from-[#f5f1e8] via-[#eef5ec] to-[#e6efe9]"
    >
      <h2 className="text-3xl md:text-4xl font-serif text-center mb-4 text-gray-800">
        Our Best Sellers 🌿
      </h2>

      <p className="text-center text-gray-600 mb-8 md:mb-10 px-4">
        Explore our top 8 customer favorites
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 px-3 md:px-6">
        {products.map((product) => {
          const cartItem = cart.find((i) => i._id === product._id)
          const quantity = cartItem?.quantity || 0

          return (
            <div
              key={product._id}
              className="rounded-xl md:rounded-2xl overflow-hidden bg-white/60 backdrop-blur-xl border border-white/30 shadow-md hover:shadow-2xl transition group"
            >
              <Link href={`/plants/${product?.slug?.current || ''}`}>
                <div className="w-full h-28 sm:h-32 md:h-56 flex items-center justify-center bg-white/50 cursor-pointer">
                  <img
                    src={urlFor(product.image).url()}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition"
                  />
                </div>
              </Link>

              <div className="p-2 sm:p-3 md:p-5">
                <Link href={`/plants/${product?.slug?.current || ''}`}>
                  <h3 className="text-xs sm:text-sm md:text-lg font-semibold text-gray-900 hover:text-green-800 transition">
                    {product.name}
                  </h3>
                </Link>

                <p className="text-green-800 font-bold mt-1 text-sm md:text-lg">
                  ₹{product.price}
                </p>

                {/* CART BUTTON */}
                {quantity > 0 ? (
                  <div className="mt-2 flex items-center justify-between bg-green-800 text-white rounded-lg px-2 py-1">
                    <button onClick={() => removeFromCart(product)}>
                      -
                    </button>
                    <span>{quantity}</span>
                    <button onClick={() => addToCart(product)}>
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-2 w-full bg-green-800 text-white py-1.5 rounded-lg text-xs md:text-sm"
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* CART FLOAT */}
      {totalItems > 0 && (
        <div className="fixed bottom-5 right-5 bg-green-800 text-white px-4 py-2 rounded-full shadow-lg">
          🛒 {totalItems}
        </div>
      )}

      <div className="flex justify-center mt-8 md:mt-10">
        <Link
          href="/plants"
          className="bg-green-800 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full shadow-lg hover:bg-green-900 transition text-sm md:text-base"
        >
          View All Plants
        </Link>
      </div>
    </section>
  )
}