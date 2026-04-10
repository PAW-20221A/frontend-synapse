import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import History from './pages/History.jsx'
import Login from './pages/Login.jsx'
import Quiz from './pages/Quiz.jsx'
import Register from './pages/Register.jsx'
import Session from './pages/Session.jsx'
import { useAuth } from './store/AuthContext.jsx'

function PrivateRoute({ children }) {
  const { token } = useAuth()
  return token ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/quiz/:id" element={<PrivateRoute><Quiz /></PrivateRoute>} />
        <Route path="/session/:id" element={<PrivateRoute><Session /></PrivateRoute>} />
        <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
