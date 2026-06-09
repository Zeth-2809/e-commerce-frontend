import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../context/CartContext'

function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        setProduct(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className="text-center text-purple-400 text-xl mt-20">Loading...</div>
  if (!product) return <div className="text-center text-gray-400 text-xl mt-20">Product not found</div>

  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="text-purple-400 hover:text-purple-300 mb-8 flex items-center gap-2"
        >
          ← Back to Products
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-2xl object-cover"
          />
          <div>
            <span className="text-purple-400 font-medium">{product.category}</span>
            <h1 className="text-4xl font-bold text-white mt-2">{product.name}</h1>
            <p className="text-gray-400 mt-4 text-lg">{product.description}</p>
            <p className="text-4xl font-bold text-white mt-6">${product.price}</p>
            <p className="text-gray-400 mt-2">Stock: {product.stock} left</p>
            <button
              onClick={() => { addToCart(product); navigate('/cart') }}
              className="mt-8 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Add to Cart 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage