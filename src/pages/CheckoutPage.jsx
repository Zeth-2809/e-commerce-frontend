import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

function CheckoutPage() {
  const { cartItems, getTotalPrice } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    card: '',
  })
  const [ordered, setOrdered] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.address || !form.card) {
      alert('Please fill in all fields!')
      return
    }
    setOrdered(true)
  }

  if (ordered) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold text-white mb-4">Order Placed!</h1>
        <p className="text-gray-400 text-lg mb-8">Thank you for your purchase, {form.name}!</p>
        <button
          onClick={() => navigate('/')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full transition"
        >
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
          <div className="flex flex-col gap-4">
            <input name="name" placeholder="Full Name" onChange={handleChange}
              className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500" />
            <input name="email" placeholder="Email" onChange={handleChange}
              className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500" />
            <input name="address" placeholder="Address" onChange={handleChange}
              className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500" />
            <div className="grid grid-cols-2 gap-4">
              <input name="city" placeholder="City" onChange={handleChange}
                className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500" />
              <input name="zip" placeholder="ZIP Code" onChange={handleChange}
                className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <input name="card" placeholder="Card Number" onChange={handleChange}
              className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500" />
            <button
              onClick={handleSubmit}
              className="mt-4 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Place Order 🎉
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