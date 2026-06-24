import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

const statusOptions = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled']
const statusColors = {
  Pending: 'bg-yellow-500',
  Confirmed: 'bg-blue-500',
  Shipped: 'bg-purple-500',
  Delivered: 'bg-green-500',
  Cancelled: 'bg-red-500',
}

function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/orders/all', {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      setOrders(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      setOrders(orders.map(o => o._id === orderId ? { ...o, status } : o))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          All <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">Orders</span>
        </h1>

        {loading ? (
          <p className="text-purple-400">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-400">No orders yet</p>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map(order => (
              <div key={order._id} className="bg-gray-900 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">Customer</p>
                    <p className="text-white font-medium">{order.user?.name} ({order.user?.email})</p>
                  </div>
                  <span className={`${statusColors[order.status]} text-white text-sm px-4 py-1 rounded-full font-medium`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-2">{order.orderItems.length} item(s) — ${order.totalPrice}</p>
                <p className="text-gray-500 text-sm mb-4">
                  {order.shippingAddress.fullName}, {order.shippingAddress.address}, {order.shippingAddress.city}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {statusOptions.map(status => (
                    <button
                      key={status}
                      onClick={() => updateStatus(order._id, status)}
                      className={`px-3 py-1 rounded-full text-sm transition ${
                        order.status === status
                          ? statusColors[status] + ' text-white'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminOrders