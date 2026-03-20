'use client'

import { useCart } from '@/context/CartContext'

export default function CheckoutModal() {
  const {
    cart,
    showCheckout,
    setShowCheckout,
    customerName,
    setCustomerName,
    customerPhone,
    setCustomerPhone,
    customerAddress,
    setCustomerAddress,
    customerNotes,
    setCustomerNotes,
    clearCart,
    sendToWhatsApp,
    cartTotal,
  } = useCart()

  if (!showCheckout) return null

  return (
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
  )
}