'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'
import { useCart } from '@/context/CartContext'
import CheckoutModal from '@/components/CheckoutModal'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

export default function PlantsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')

  const {
    cart,
    addToCart,
    removeFromCart,
    totalCartItems,
    setShowCheckout,
  } = useCart()

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await client.fetch(`
          *[_type == "product"] | order(name asc){
            _id,
            name,
            slug,
            price,
            category,
            image
          }
        `)
        setProducts(data || [])
      } catch (error) {
        console.error('Error fetching products:', error)
        setProducts([])
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p?.category === selectedCategory)

  return (
    <section className="py-16 min-h-screen bg-gradient-to-br from-[#f5f1e8] via-[#eef5ec] to-[#e6efe9]">
      <h1 className="text-3xl md:text-5xl font-serif text-center mb-4 text-gray-800">
        All Plants 🌿
      </h1>

      <p className="text-center text-gray-600 mb-8 md:mb-10 px-4">
        Explore all our indoor, outdoor, flowering and fruiting plants
      </p>

      <div className="flex justify-center gap-2 md:gap-3 mb-8 md:mb-10 flex-wrap px-4">
        {['all', 'indoor', 'outdoor', 'fruiting', 'flowering'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base rounded-full border transition backdrop-blur-md ${
              selectedCategory === cat
                ? 'bg-green-800 text-white shadow-md'
                : 'bg-white/60 text-gray-700 hover:bg-white'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 px-3 md:px-6">
        {filteredProducts.map((product) => {
          const cartItem = cart.find((item) => item?._id === product?._id)
          const quantity = cartItem?.quantity || 0
          const productHref = product?.slug?.current
            ? `/plants/${product.slug.current}`
            : '#'

          return (
            <div
              key={product?._id}
              className="rounded-xl md:rounded-2xl overflow-hidden bg-white/60 backdrop-blur-xl border border-white/30 shadow-md hover:shadow-2xl transition duration-500 group"
            >
              {product?.slug?.current ? (
                <Link href={productHref}>
                  <div className="w-full h-28 sm:h-32 md:h-56 flex items-center justify-center bg-white/50 cursor-pointer">
                    <img
                      src={
                        product?.image
                          ? urlFor(product.image).url()
                          : '/placeholder.png'
                      }
                      alt={product?.name || 'Plant image'}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </Link>
              ) : (
                <div className="w-full h-28 sm:h-32 md:h-56 flex items-center justify-center bg-white/50">
                  <img
                    src={
                      product?.image
                        ? urlFor(product.image).url()
                        : '/placeholder.png'
                    }
                    alt={product?.name || 'Plant image'}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}

              <div className="p-2 sm:p-3 md:p-5">
                {product?.slug?.current ? (
                  <Link href={productHref}>
                    <h3 className="text-xs sm:text-sm md:text-lg font-semibold text-gray-900 cursor-pointer hover:text-green-800 transition leading-tight">
                      {product?.name || 'Unnamed Product'}
                    </h3>
                  </Link>
                ) : (
                  <h3 className="text-xs sm:text-sm md:text-lg font-semibold text-gray-900 leading-tight">
                    {product?.name || 'Unnamed Product'}
                  </h3>
                )}

                <p className="text-green-800 font-bold mt-1 text-sm md:text-lg">
                  ₹{product?.price || 0}
                </p>

                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-1 capitalize">
                  {product?.category || 'plant'}
                </p>

                {quantity > 0 ? (
                  <div className="mt-2 flex items-center justify-between bg-green-800 text-white rounded-lg md:rounded-xl px-2 py-1 md:px-3 md:py-2 shadow-md">
                    <button
                      onClick={() => removeFromCart(product)}
                      className="text-base md:text-xl font-bold px-1 md:px-2"
                    >
                      -
                    </button>

                    <span className="text-xs sm:text-sm md:text-base font-semibold">
                      {quantity}
                    </span>

                    <button
                      onClick={() => addToCart(product)}
                      className="text-base md:text-xl font-bold px-1 md:px-2"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-2 w-full bg-gradient-to-r from-green-700 to-green-900 text-white py-1.5 md:py-2 rounded-lg md:rounded-xl text-xs sm:text-sm md:text-base hover:scale-105 transition duration-300 shadow-md hover:shadow-xl"
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <button
        onClick={() => {
          if (cart.length === 0) {
            alert('Cart is empty')
            return
          }
          setShowCheckout(true)
        }}
        className="fixed bottom-5 right-4 md:bottom-6 md:right-6 bg-green-800 text-white px-4 md:px-5 py-2.5 md:py-3 rounded-full shadow-lg hover:bg-green-900 transition z-50 text-sm md:text-base"
      >
        Order Now 🛒 ({totalCartItems})
      </button>

      <CheckoutModal />
    </section>
  )
}