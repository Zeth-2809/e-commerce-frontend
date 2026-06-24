import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const outOfStock = product.stock <= 0
  const [qty, setQty] = useState(1)

  const increase = () => setQty(prev => Math.min(prev + 1, product.stock))
  const decrease = () => setQty(prev => Math.max(prev - 1, 1))

  const handleAddToCart = () => {
    addToCart(product, qty)
    setQty(1)
  }

  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden hover:scale-105 transition duration-300 shadow-lg relative">
      {outOfStock && (
        <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
          Out of Stock
        </div>
      )}
      <img
        src={product.image}
        alt={product.name}
        className={`w-full h-48 object-cover ${outOfStock ? 'opacity-50' : ''}`}
      />
      <div className="p-4">
        <span className="text-purple-400 text-sm font-medium">{product.category}</span>
        <h3 className="text-white text-lg font-bold mt-1">{product.name}</h3>
        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{product.description}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-white">${product.price}</span>
          <Link
            to={`/product/${product._id}`}
            className="border border-purple-500 text-purple-400 px-3 py-1 rounded-full text-sm hover:bg-purple-500 hover:text-white transition"
          >
            View
          </Link>
        </div>

        {!outOfStock && (
          <div className="flex items-center justify-between mt-4 gap-3">
            <div className="flex items-center gap-3 bg-gray-800 rounded-full px-3 py-1">
              <button
                onClick={decrease}
                disabled={qty <= 1}
                className="text-white w-6 h-6 flex items-center justify-center hover:text-purple-400 disabled:opacity-30 transition"
              >
                −
              </button>
              <span className="text-white font-medium w-6 text-center">{qty}</span>
              <button
                onClick={increase}
                disabled={qty >= product.stock}
                className="text-white w-6 h-6 flex items-center justify-center hover:text-purple-400 disabled:opacity-30 transition"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-full text-sm transition"
            >
              Add to Cart
            </button>
          </div>
        )}

        {outOfStock && (
          <button
            disabled
            className="mt-4 w-full bg-purple-600 text-white px-3 py-2 rounded-full text-sm opacity-40 cursor-not-allowed"
          >
            Sold Out
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductCard