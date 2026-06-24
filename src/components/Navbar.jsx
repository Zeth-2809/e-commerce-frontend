import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { getTotalItems } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    navigate('/')
  }

  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="bg-gray-950 text-white px-8 py-4 sticky top-0 z-50 shadow-lg">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          ZethStore
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          <Link to="/" className="hover:text-purple-400 transition">Home</Link>
          <Link to="/cart" className="relative hover:text-purple-400 transition">
            🛒 Cart
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-4 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-purple-400 font-medium">Hi, {user.name}!</span>
              <Link to="/orders" className="hover:text-purple-400 transition">My Orders</Link>
              {user.isAdmin && (
                <Link to="/admin" className="text-yellow-400 hover:text-yellow-300 transition font-medium">
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="border border-purple-500 text-purple-400 px-4 py-1 rounded-full text-sm hover:bg-purple-500 hover:text-white transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <Link to="/login" className="hover:text-purple-400 transition">Login</Link>
              <Link to="/register" className="bg-purple-600 hover:bg-purple-700 px-4 py-1 rounded-full text-sm transition">Register</Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <Link to="/cart" className="relative hover:text-purple-400 transition">
            🛒
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-3 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 text-center">
          <Link to="/" onClick={closeMenu} className="hover:text-purple-400 transition block py-2">Home</Link>
          {user ? (
            <>
              <span className="text-purple-400 font-medium py-2">Hi, {user.name}!</span>
              <Link to="/orders" onClick={closeMenu} className="hover:text-purple-400 transition block py-2">My Orders</Link>
              {user.isAdmin && (
                <Link to="/admin" onClick={closeMenu} className="text-yellow-400 hover:text-yellow-300 transition font-medium block py-2">Admin</Link>
              )}
              <button onClick={handleLogout} className="border border-purple-500 text-purple-400 px-4 py-2 rounded-full text-sm hover:bg-purple-500 hover:text-white transition mx-auto">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu} className="hover:text-purple-400 transition block py-2">Login</Link>
              <Link to="/register" onClick={closeMenu} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full text-sm transition mx-auto inline-block">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar