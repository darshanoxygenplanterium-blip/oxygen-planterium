'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react'

type CartItem = {
  _id: string
  name?: string
  price?: number
  category?: string
  image?: any
  slug?: { current?: string }
  quantity: number
}

type CartContextType = {
  cart: CartItem[]
  showCheckout: boolean
  setShowCheckout: (value: boolean) => void
  customerName: string
  setCustomerName: (value: string) => void
  customerPhone: string
  setCustomerPhone: (value: string) => void
  customerAddress: string
  setCustomerAddress: (value: string) => void
  customerNotes: string
  setCustomerNotes: (value: string) => void
  addToCart: (product: any) => void
  removeFromCart: (product: any) => void
  clearCart: () => void
  sendToWhatsApp: () => void
  totalCartItems: number
  cartTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCheckout, setShowCheckout] = useState(false)

  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')
  const [customerNotes, setCustomerNotes] = useState('')

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
      console.error('Error loading cart data:', error)
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
      console.error('Error saving customer data:', error)
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

    message += `\n📦 Total Items: ${totalCartItems}\n`
    message += `💰 Grand Total: ₹${cartTotal}\n`
    message += `\nPlease confirm availability and delivery details.`

    const url = `https://wa.me/919380329328?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <CartContext.Provider
      value={{
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
        addToCart,
        removeFromCart,
        clearCart,
        sendToWhatsApp,
        totalCartItems,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return context
}