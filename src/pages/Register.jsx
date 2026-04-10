import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register as registerApi } from '../services/api.js'
import { useAuth } from '../store/AuthContext.jsx'

export default function Register() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', name: '' })
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const { data } = await registerApi(form)
      login(data.access_token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.detail || 'Erro ao criar conta.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow w-full max-w-sm">
        <h1 className="text-2xl font-bold text-indigo-600 mb-6">Criar conta</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          className="w-full border rounded-lg px-3 py-2 mb-3 text-sm"
          type="text" placeholder="Nome (opcional)"
          value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full border rounded-lg px-3 py-2 mb-3 text-sm"
          type="email" placeholder="E-mail" required
          value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="w-full border rounded-lg px-3 py-2 mb-5 text-sm"
          type="password" placeholder="Senha" required
          value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-medium">
          Cadastrar
        </button>
        <p className="text-center text-sm text-gray-500 mt-4">
          Já tem conta? <Link to="/login" className="text-indigo-600 hover:underline">Entrar</Link>
        </p>
      </form>
    </div>
  )
}
