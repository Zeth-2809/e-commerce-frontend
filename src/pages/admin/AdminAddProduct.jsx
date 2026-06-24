import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

function AdminAddProduct() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [extraImages, setExtraImages] = useState('')
  const [category, setCategory] = useState('')
  const [stock, setStock] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const images = extraImages
        .split(',')
        .map(url => url.trim())
        .filter(url => url.length > 0)

      await axios.post(
        'http://localhost:5000/api/products',
        { name, description, price, image, images, category, stock },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      navigate('/admin/products')
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          Add <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">Product</span>
        </h1>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl p-8 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="3"
            className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Main Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Extra Image URLs (comma separated, optional)"
            value={extraImages}
            onChange={(e) => setExtraImages(e.target.value)}
            className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
          />
          {image && (
            <div>
              <p className="text-gray-400 text-sm mb-2">Image Preview:</p>
              <img src={image} alt="preview" className="w-32 h-32 object-cover rounded-xl" />
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminAddProduct