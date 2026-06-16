import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function AdminRoute({ children }) {
  const { user } = useAuth()
  return user && user.isAdmin ? children : <Navigate to="/login" />
}

export default AdminRoute