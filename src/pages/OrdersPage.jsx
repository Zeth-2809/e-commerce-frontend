import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const statusColors = {
  Pending: 'bg-yellow-500',
  Confirmed: 'bg-blue-500',
  Shipped: 'bg-purple-500',
  Delivered: 'bg-green-500',
  Cancelled: 'bg-red-500',
}

function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return
    axios.get('http://localhost:5000/api/orders/myorders', {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(({ data }) => {
        setOrders(data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400 text-xl">Please login to view your orders</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          My <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">Orders</span>
        </h1>

        {loading ? (
          <p className="text-purple-400">Loading...</p>
        ) : orders.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-gray-400 text-xl mb-4">You haven't placed any orders yet</p>
            <Link to="/" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map(order => (
              <Link
                to={`/orders/${order._id}`}
                key={order._id}
                className="bg-gray-900 rounded-2xl p-6 hover:scale-[1.01] transition duration-300 block"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">Order ID</p>
                    <p className="text-white font-mono text-sm">{order._id}</p>
                  </div>
                  <span className={`${statusColors[order.status]} text-white text-sm px-4 py-1 rounded-full font-medium`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-400">{order.orderItems.length} item(s)</p>
                  <p className="text-white font-bold text-xl">${order.totalPrice}</p>
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrdersPage