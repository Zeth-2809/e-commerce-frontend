import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Navbar() {
  const { getTotalItems } = useCart()

  return (
    <nav className="bg-gray-950 text-white px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-lg">
      <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
        ZethStore
      </Link>
      <div className="flex gap-8 items-center">
        <Link to="/" className="hover:text-purple-400 transition">Home</Link>
        <Link to="/cart" className="relative hover:text-purple-400 transition">
          🛒 Cart
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-4 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </Link>
      </div>
    </nav>
  )
}

export default Navbar