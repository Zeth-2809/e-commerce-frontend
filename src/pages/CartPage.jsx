import { useCart } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'

function CartPage() {
  const { cartItems, removeFromCart, getTotalPrice } = useCart()
  const navigate = useNavigate()

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center">
        <p className="text-gray-400 text-xl mb-4">Your cart is empty 🛒</p>
        <Link to="/" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full transition">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          Your <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">Cart</span>
        </h1>

        <div className="flex flex-col gap-4">
          {cartItems.map(item => (
            <div key={item._id} className="bg-gray-900 rounded-2xl p-4 flex items-center gap-6">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg">{item.name}</h3>
                <p className="text-gray-400">{item.category}</p>
                <p className="text-purple-400 font-semibold mt-1">Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-xl">${item.price * item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-400 hover:text-red-300 text-sm mt-2 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 mt-8">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-lg">Total</span>
            <span className="text-white font-bold text-3xl">${getTotalPrice()}</span>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="mt-6 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Proceed to Checkout →
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartPage