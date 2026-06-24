import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function CheckoutPage() {
  const { cartItems, getTotalPrice, removeFromCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    address: '',
    city: '',
    zip: '',
    phone: '',
  })
  const [ordered, setOrdered] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.fullName || !form.address || !form.city || !form.zip || !form.phone) {
      setError('Please fill in all fields!')
      return
    }

    if (!user) {
      navigate('/login')
      return
    }

    setLoading(true)
    setError('')

    try {
      const orderItems = cartItems.map(item => ({
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        product: item._id,
      }))

      await axios.post(
        'http://localhost:5000/api/orders',
        {
          orderItems,
          shippingAddress: form,
          totalPrice: getTotalPrice(),
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )

      cartItems.forEach(item => removeFromCart(item._id))
      setOrdered(true)
      setLoading(false)
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong')
      setLoading(false)
    }
  }

  if (ordered) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold text-white mb-4">Order Placed!</h1>
        <p className="text-gray-400 text-lg mb-8 text-center">Thank you for your purchase, {form.fullName}! Your order is being processed.</p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/orders')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full transition"
          >
            View My Orders
          </button>
          <button
            onClick={() => navigate('/')}
            className="border border-purple-500 text-purple-400 px-8 py-3 rounded-full transition hover:bg-purple-500 hover:text-white"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center">
        <p className="text-gray-400 text-xl mb-4">Your cart is empty 🛒</p>
        <button onClick={() => navigate('/')} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full transition">
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-bold text-white mb-8">
            Check<span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">out</span>
          </h1>
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <div className="flex flex-col gap-4">
            <input name="fullName" placeholder="Full Name" onChange={handleChange}
              className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500" />
            <input name="phone" placeholder="Phone Number" onChange={handleChange}
              className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500" />
            <input name="address" placeholder="Address" onChange={handleChange}
              className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500" />
            <div className="grid grid-cols-2 gap-4">
              <input name="city" placeholder="City" onChange={handleChange}
                className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500" />
              <input name="zip" placeholder="ZIP Code" onChange={handleChange}
                className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-4 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Placing order...' : 'Place Order 🎉'}
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
          <div className="flex flex-col gap-4">
            {cartItems.map(item => (
              <div key={item._id} className="bg-gray-900 rounded-xl p-4 flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">{item.name}</p>
                  <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                </div>
                <p className="text-white font-bold">${item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          <div className="bg-gray-900 rounded-xl p-4 mt-4 flex justify-between items-center">
            <span className="text-gray-400">Total</span>
            <span className="text-white font-bold text-2xl">${getTotalPrice()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage