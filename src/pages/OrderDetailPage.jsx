import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const steps = ['Pending', 'Confirmed', 'Shipped', 'Delivered']

function OrderDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    axios.get(`http://localhost:5000/api/orders/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(({ data }) => {
        setOrder(data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [id, user])

  if (loading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-purple-400">Loading...</div>
  if (!order) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">Order not found</div>

  const currentStepIndex = order.status === 'Cancelled' ? -1 : steps.indexOf(order.status)

  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Order Details</h1>
        <p className="text-gray-400 font-mono text-sm mb-8">{order._id}</p>

        {/* Status Timeline */}
        {order.status !== 'Cancelled' ? (
          <div className="bg-gray-900 rounded-2xl p-8 mb-8">
            <div className="flex justify-between relative">
              {steps.map((step, index) => (
                <div key={step} className="flex flex-col items-center flex-1 relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    index <= currentStepIndex ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-400'
                  }`}>
                    {index <= currentStepIndex ? '✓' : index + 1}
                  </div>
                  <p className={`text-sm mt-2 ${index <= currentStepIndex ? 'text-white' : 'text-gray-500'}`}>
                    {step}
                  </p>
                </div>
              ))}
              <div className="absolute top-5 left-0 right-0 h-1 bg-gray-700 -z-0" style={{ marginLeft: '5%', marginRight: '5%' }}>
                <div
                  className="h-1 bg-purple-500 transition-all duration-500"
                  style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-red-900 bg-opacity-30 border border-red-500 rounded-2xl p-6 mb-8 text-center">
            <p className="text-red-400 font-bold text-lg">❌ Order Cancelled</p>
          </div>
        )}

        {/* Shipping Info */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-bold mb-4">Shipping Address</h2>
          <p className="text-gray-400">{order.shippingAddress.fullName}</p>
          <p className="text-gray-400">{order.shippingAddress.address}, {order.shippingAddress.city}</p>
          <p className="text-gray-400">{order.shippingAddress.zip}</p>
          <p className="text-gray-400">{order.shippingAddress.phone}</p>
        </div>

        {/* Items */}
        <div className="bg-gray-900 rounded-2xl p-6">
          <h2 className="text-white font-bold mb-4">Items</h2>
          <div className="flex flex-col gap-4">
            {order.orderItems.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                <div className="flex-1">
                  <p className="text-white font-medium">{item.name}</p>
                  <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                </div>
                <p className="text-white font-bold">${item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-4 pt-4 flex justify-between">
            <span className="text-gray-400">Total</span>
            <span className="text-white font-bold text-xl">${order.totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailPage