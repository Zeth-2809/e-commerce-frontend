import { useState, useEffect } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'

function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('newest')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [search, category, sort, minPrice, maxPrice])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('http://localhost:5000/api/products', {
        params: { search, category, sort, minPrice, maxPrice }
      })
      setProducts(data)

      // Extract unique categories
      const uniqueCategories = [...new Set(data.map(p => p.category))]
      setCategories(uniqueCategories)

      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const clearFilters = () => {
    setSearch('')
    setCategory('all')
    setSort('newest')
    setMinPrice('')
    setMaxPrice('')
  }

  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">
          Our <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">Products</span>
        </h1>
        <p className="text-gray-400 mb-8">Find the best products at the best prices</p>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-900 text-white px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 pl-12"
          />
          <span className="absolute left-4 top-4 text-gray-400 text-xl">🔍</span>
        </div>

        {/* Filters */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Category */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Sort By</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Min Price */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Min Price ($)</label>
            <input
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Max Price */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Max Price ($)</label>
            <input
              type="number"
              placeholder="9999"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Results Count + Clear */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-400">
            Showing <span className="text-white font-semibold">{products.length}</span> products
          </p>
          <button
            onClick={clearFilters}
            className="text-purple-400 hover:text-purple-300 text-sm transition"
          >
            Clear Filters ✕
          </button>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center text-purple-400 text-xl mt-20">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center mt-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-400 text-xl">No products found</p>
            <button
              onClick={clearFilters}
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage