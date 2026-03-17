'use client'

import { useEffect, useState } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

export default function Products() {
  const [products, setProducts] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const data = await client.fetch(`*[_type == "product"]`)
      setProducts(data)
    }
    fetchProducts()
  }, [])

  function addToCart(product: any) {
    const existing = cart.find((item) => item._id === product._id)

    if (existing) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  function sendToWhatsApp() {
    if (cart.length === 0) {
      alert('Cart is empty')
      return
    }

    let message = 'Hi, I want to order:\n\n'

    cart.forEach((item) => {
      message += `🌿 ${item.name} x ${item.quantity} - ₹${
        item.price * item.quantity
      }\n`
    })

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    message += `\nTotal: ₹${total}`

    const url = `https://wa.me/919380329328?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory)

  return (
    <section id="products" className="py-16 scroll-mt-12 bg-gradient-to-br from-[#f5f1e8] via-[#eef5ec] to-[#e6efe9]">
      
      <h2 className="text-3xl md:text-4xl font-serif text-center mb-10 text-gray-800">
        Our Plants 🌿
      </h2>

      {/* CATEGORY FILTER */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {['all', 'indoor', 'outdoor', 'fruiting', 'flowering'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full border transition backdrop-blur-md ${
              selectedCategory === cat
                ? 'bg-green-800 text-white shadow-md'
                : 'bg-white/60 text-gray-700 hover:bg-white'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="rounded-2xl overflow-hidden bg-white/60 backdrop-blur-xl border border-white/30 shadow-md hover:shadow-2xl transition duration-500 group"
          >
            {/* Image */}
            <div className="w-full h-56 flex items-center justify-center bg-white/50">
              <img
                src={urlFor(product.image).url()}
                alt={product.name}
                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900">
                {product.name}
              </h3>

              <p className="text-green-800 font-bold mt-2 text-lg">
                ₹{product.price}
              </p>

              <button
                onClick={() => addToCart(product)}
                className="mt-5 w-full bg-gradient-to-r from-green-700 to-green-900 text-white py-2 rounded-xl hover:scale-105 transition duration-300 shadow-md hover:shadow-xl"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* WHATSAPP BUTTON */}
      <button
        onClick={sendToWhatsApp}
        className="fixed bottom-6 right-6 bg-green-800 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-900 transition z-50"
      >
        Order Now 🛒 ({cart.length})
      </button>
    </section>
  )
}