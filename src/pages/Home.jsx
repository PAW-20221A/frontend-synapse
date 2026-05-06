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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 px-4">
      <div className="max-w-xl w-full">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
            Aprenda com qualquer vídeo
          </h1>
          <p className="text-gray-500 text-sm">
            Cole um link do YouTube e transforme em uma sessão de estudos interativa.
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-8 transition hover:shadow-xl"
        >
          {error && (
            <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4 border border-red-200">
              {error}
            </div>
          )}

          {/* URL */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL do YouTube
          </label>
          <div className="relative mb-5">
            <input
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              required
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
          </div>

          {/* Questions */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número de perguntas
          </label>
          <input
            className="w-full border rounded-lg px-3 py-2 mb-6 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            type="number"
            min={1}
            max={20}
            value={questionCount}
            onChange={e => setQuestionCount(Number(e.target.value))}
          />

          {/* Button */}
          <button
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium text-sm 
            hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-md hover:shadow-lg"
          >
            Gerar Quiz
          </button>
        </form>

        {/* Footer hint */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Funciona melhor com vídeos educativos ou explicativos 🎯
        </p>

      </div>
    </div>
  )
}
