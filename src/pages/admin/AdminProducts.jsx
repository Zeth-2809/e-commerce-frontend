import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/products')
      setProducts(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      setProducts(products.filter(p => p._id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            All <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">Products</span>
          </h1>
          <Link
            to="/admin/products/add"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition"
          >
            + Add Product
          </Link>
        </div>

        {loading ? (
          <p className="text-purple-400 text-center">Loading...</p>
        ) : (
          <div className="bg-gray-900 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-gray-400 px-6 py-4">Image</th>
                  <th className="text-left text-gray-400 px-6 py-4">Name</th>
                  <th className="text-left text-gray-400 px-6 py-4">Category</th>
                  <th className="text-left text-gray-400 px-6 py-4">Price</th>
                  <th className="text-left text-gray-400 px-6 py-4">Stock</th>
                  <th className="text-left text-gray-400 px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id} className="border-b border-gray-800 hover:bg-gray-800 transition">
                    <td className="px-6 py-4">
                      <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                    </td>
                    <td className="px-6 py-4 text-white font-medium">{product.name}</td>
                    <td className="px-6 py-4 text-gray-400">{product.category}</td>
                    <td className="px-6 py-4 text-white">${product.price}</td>
                    <td className="px-6 py-4 text-gray-400">{product.stock}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          to={`/admin/products/edit/${product._id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteProduct(product._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminProducts