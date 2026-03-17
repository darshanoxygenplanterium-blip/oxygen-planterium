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
      try {
        const data = await client.fetch(`*[_type == "product"]`)
        setProducts(data || [])
      } catch (error) {
        console.error('Error fetching products:', error)
      }
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

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <section
      id="products"
      className="py-16 scroll-mt-12 bg-gradient-to-br from-[#f5f1e8] via-[#eef5ec] to-[#e6efe9]"
    >
      <h2 className="text-3xl md:text-4xl font-serif text-center mb-10 text-gray-800">
        Our Plants 🌿
      </h2>

      <div className="flex justify-center gap-3 mb-10 flex-wrap px-4">
        {['all', 'indoor', 'outdoor', 'fruiting', 'flowering'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-sm md:text-base rounded-full border transition backdrop-blur-md ${
              selectedCategory === cat
                ? 'bg-green-800 text-white shadow-md'
                : 'bg-white/60 text-gray-700 hover:bg-white'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="rounded-2xl overflow-hidden bg-white/60 backdrop-blur-xl border border-white/30 shadow-md hover:shadow-2xl transition duration-500 group"
          >
            <div className="w-full h-40 md:h-56 flex items-center justify-center bg-white/50">
              <img
                src={
                  product.image
                    ? urlFor(product.image).url()
                    : '/placeholder.png'
                }
                alt={product.name}
                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="p-3 md:p-5">
              <h3 className="text-sm md:text-lg font-semibold text-gray-900">
                {product.name}
              </h3>

              <p className="text-green-800 font-bold mt-1 text-sm md:text-lg">
                ₹{product.price}
              </p>

              <button
                onClick={() => addToCart(product)}
                className="mt-3 w-full bg-gradient-to-r from-green-700 to-green-900 text-white py-1.5 md:py-2 rounded-xl text-sm md:text-base hover:scale-105 transition duration-300 shadow-md hover:shadow-xl"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={sendToWhatsApp}
        className="fixed bottom-6 right-6 bg-green-800 text-white px-5 py-3 rounded-full shadow-lg hover:bg-green-900 transition z-50"
      >
        Order Now 🛒 ({totalCartItems})
      </button>
    </section>
  )
}