'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

export default function PlantsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [cart, setCart] = useState<any[]>([])
  const [showCheckout, setShowCheckout] = useState(false)

  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')
  const [customerNotes, setCustomerNotes] = useState('')

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

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('plant_cart')
      const savedName = localStorage.getItem('plant_customer_name')
      const savedPhone = localStorage.getItem('plant_customer_phone')
      const savedAddress = localStorage.getItem('plant_customer_address')
      const savedNotes = localStorage.getItem('plant_customer_notes')

      if (savedCart) setCart(JSON.parse(savedCart))
      if (savedName) setCustomerName(savedName)
      if (savedPhone) setCustomerPhone(savedPhone)
      if (savedAddress) setCustomerAddress(savedAddress)
      if (savedNotes) setCustomerNotes(savedNotes)
    } catch (error) {
      console.error('Error loading localStorage data:', error)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('plant_cart', JSON.stringify(cart))
    } catch (error) {
      console.error('Error saving cart:', error)
    }
  }, [cart])

  useEffect(() => {
    try {
      localStorage.setItem('plant_customer_name', customerName || '')
      localStorage.setItem('plant_customer_phone', customerPhone || '')
      localStorage.setItem('plant_customer_address', customerAddress || '')
      localStorage.setItem('plant_customer_notes', customerNotes || '')
    } catch (error) {
      console.error('Error saving customer info:', error)
    }
  }, [customerName, customerPhone, customerAddress, customerNotes])

  function addToCart(product: any) {
    const existing = cart.find((item) => item?._id === product?._id)

    if (existing) {
      setCart(
        cart.map((item) =>
          item?._id === product?._id
            ? { ...item, quantity: (item?.quantity || 0) + 1 }
            : item
        )
      )
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  function removeFromCart(product: any) {
    const existing = cart.find((item) => item?._id === product?._id)

    if (!existing) return

    if ((existing?.quantity || 0) === 1) {
      setCart(cart.filter((item) => item?._id !== product?._id))
    } else {
      setCart(
        cart.map((item) =>
          item?._id === product?._id
            ? { ...item, quantity: (item?.quantity || 1) - 1 }
            : item
        )
      )
    }
  }

  function clearCart() {
    setCart([])
    setShowCheckout(false)
    try {
      localStorage.removeItem('plant_cart')
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  }

  function sendToWhatsApp() {
    if (cart.length === 0) {
      alert('Cart is empty')
      return
    }

    if (!customerName.trim()) {
      alert('Please enter your name')
      return
    }

    if (!customerPhone.trim()) {
      alert('Please enter your phone number')
      return
    }

    if (!customerAddress.trim()) {
      alert('Please enter your delivery address')
      return
    }

    let message = '🌿 *New Plant Order Request* 🌿\n\n'
    message += `👤 Name: ${customerName.trim()}\n`
    message += `📞 Phone: ${customerPhone.trim()}\n`
    message += `📍 Address: ${customerAddress.trim()}\n`

    if (customerNotes.trim()) {
      message += `📝 Notes: ${customerNotes.trim()}\n`
    }

    message += `\n🛒 *Order Items*\n`

    cart.forEach((item, index) => {
      const quantity = item?.quantity || 0
      const price = item?.price || 0
      const lineTotal = quantity * price

      message += `${index + 1}. ${item?.name || 'Product'}`
      message += `\n   Qty: ${quantity}`
      message += ` | Price: ₹${price}`
      message += ` | Total: ₹${lineTotal}\n`
    })

    const totalItems = cart.reduce(
      (sum, item) => sum + (item?.quantity || 0),
      0
    )

    const grandTotal = cart.reduce(
      (sum, item) => sum + (item?.price || 0) * (item?.quantity || 0),
      0
    )

    message += `\n📦 Total Items: ${totalItems}\n`
    message += `💰 Grand Total: ₹${grandTotal}\n`
    message += `\nPlease confirm availability and delivery details.`

    const url = `https://wa.me/919380329328?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p?.category === selectedCategory)

  const totalCartItems = useMemo(
    () => cart.reduce((sum, item) => sum + (item?.quantity || 0), 0),
    [cart]
  )

  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + (item?.price || 0) * (item?.quantity || 0),
        0
      ),
    [cart]
  )

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

      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white text-gray-900 rounded-2xl shadow-2xl p-5 md:p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                Checkout Details
              </h3>
              <button
                onClick={() => setShowCheckout(false)}
                className="text-gray-800 text-xl font-bold px-2"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-200 text-gray-900 placeholder-gray-500"
              />

              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-200 text-gray-900 placeholder-gray-500"
              />

              <textarea
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="Delivery Address"
                rows={3}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-200 text-gray-900 placeholder-gray-500 resize-none"
              />

              <textarea
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                placeholder="Notes (Optional)"
                rows={2}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-200 text-gray-900 placeholder-gray-500 resize-none"
              />

              <div className="rounded-2xl bg-[#f7faf7] border border-green-100 p-4">
                <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-3">
                  Order Summary
                </h4>

                <div className="space-y-2">
                  {cart.map((item) => (
                    <div
                      key={item?._id}
                      className="flex items-center justify-between gap-3 text-sm md:text-base"
                    >
                      <div className="text-gray-800">
                        {item?.name || 'Product'} × {item?.quantity || 0}
                      </div>
                      <div className="font-semibold text-green-800">
                        ₹{(item?.price || 0) * (item?.quantity || 0)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-3 pt-3 flex items-center justify-between font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={clearCart}
                  className="w-1/3 border border-red-300 text-red-600 py-3 rounded-xl hover:bg-red-50 transition"
                >
                  Clear Cart
                </button>

                <button
                  onClick={sendToWhatsApp}
                  className="w-2/3 bg-gradient-to-r from-green-700 to-green-900 text-white py-3 rounded-xl shadow-md hover:shadow-xl transition"
                >
                  Send Order to WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}