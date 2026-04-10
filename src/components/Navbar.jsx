import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/AuthContext.jsx'

export default function Navbar() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white border-b px-6 py-3 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-indigo-600">Synapse</Link>
      {token && (
        <div className="flex gap-4 items-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-indigo-600">Início</Link>
          <Link to="/history" className="text-sm text-gray-600 hover:text-indigo-600">Histórico</Link>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Sair
          </button>
        </div>
      )}
    </nav>
  )
}
