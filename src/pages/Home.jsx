import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingState from '../components/LoadingState.jsx'
import { generateQuiz } from '../services/api.js'

export default function Home() {
  const navigate = useNavigate()
  const [url, setUrl] = useState('')
  const [questionCount, setQuestionCount] = useState(5)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await generateQuiz({ url, question_count: questionCount })
      navigate(`/quiz/${data.id}`)
    } catch {
      setError('Erro ao gerar quiz. Verifique a URL e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingState message="Gerando seu quiz... isso pode levar alguns segundos." />

  return (
    <div className="max-w-xl mx-auto mt-16 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Aprenda com qualquer vídeo</h1>
      <p className="text-gray-500 mb-8">Cole o link de um vídeo do YouTube e transforme em uma sessão de estudos interativa.</p>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6">
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <label className="block text-sm font-medium text-gray-700 mb-1">URL do YouTube</label>
        <input
          className="w-full border rounded-lg px-3 py-2 mb-4 text-sm"
          type="url" placeholder="https://www.youtube.com/watch?v=..."
          required value={url} onChange={e => setUrl(e.target.value)}
        />
        <label className="block text-sm font-medium text-gray-700 mb-1">Número de perguntas</label>
        <input
          className="w-full border rounded-lg px-3 py-2 mb-6 text-sm"
          type="number" min={1} max={20}
          value={questionCount} onChange={e => setQuestionCount(Number(e.target.value))}
        />
        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-medium">
          Gerar Quiz
        </button>
      </form>
    </div>
  )
}
