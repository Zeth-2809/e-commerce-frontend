import { Link } from 'react-router-dom'

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">
          Admin <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">Dashboard</span>
        </h1>
        <p className="text-gray-400 mb-12">Manage your store</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/admin/products" className="bg-gray-900 rounded-2xl p-8 hover:scale-105 transition duration-300">
            <div className="text-4xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-white mb-2">Products</h2>
            <p className="text-gray-400">Add, edit, and delete products</p>
          </Link>

          <Link to="/admin/products/add" className="bg-gray-900 rounded-2xl p-8 hover:scale-105 transition duration-300">
            <div className="text-4xl mb-4">➕</div>
            <h2 className="text-2xl font-bold text-white mb-2">Add Product</h2>
            <p className="text-gray-400">Add a new product to the store</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard