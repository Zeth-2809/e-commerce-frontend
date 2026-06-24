import ProductGallery from '../components/ProductGallery'
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
  const [qty, setQty] = useState(1)

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
          <ProductGallery mainImage={product.image} images={product.images} />
          <div>
            <span className="text-purple-400 font-medium">{product.category}</span>
            <p className="text-4xl font-bold text-white mt-6">${product.price}</p>
            {product.stock > 0 ? (
              <p className="text-gray-400 mt-2">Stock: {product.stock} left</p>
            ) : (
              <p className="text-red-400 font-medium mt-2">Out of Stock</p>
            )}

            {product.stock > 0 && (
              <div className="flex items-center gap-4 mt-6">
                <span className="text-gray-400">Quantity:</span>
                <div className="flex items-center gap-4 bg-gray-800 rounded-full px-4 py-2">
                  <button
                    onClick={() => setQty(prev => Math.max(prev - 1, 1))}
                    disabled={qty <= 1}
                    className="text-white w-6 h-6 flex items-center justify-center hover:text-purple-400 disabled:opacity-30 transition"
                  >
                    −
                  </button>
                  <span className="text-white font-medium w-6 text-center">{qty}</span>
                  <button
                    onClick={() => setQty(prev => Math.min(prev + 1, product.stock))}
                    disabled={qty >= product.stock}
                    className="text-white w-6 h-6 flex items-center justify-center hover:text-purple-400 disabled:opacity-30 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => { addToCart(product, qty); navigate('/cart') }}
              disabled={product.stock <= 0}
              className="mt-6 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {product.stock > 0 ? 'Add to Cart 🛒' : 'Sold Out'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage