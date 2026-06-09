import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden hover:scale-105 transition duration-300 shadow-lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <span className="text-purple-400 text-sm font-medium">{product.category}</span>
        <h3 className="text-white text-lg font-bold mt-1">{product.name}</h3>
        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-white">${product.price}</span>
          <div className="flex gap-2">
            <Link
              to={`/product/${product._id}`}
              className="border border-purple-500 text-purple-400 px-3 py-1 rounded-full text-sm hover:bg-purple-500 hover:text-white transition"
            >
              View
            </Link>
            <button
              onClick={() => addToCart(product)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-full text-sm transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard