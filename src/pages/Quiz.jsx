import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingState from '../components/LoadingState.jsx'
import { getQuiz, startSession } from '../services/api.js'

export default function Quiz() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getQuiz(id).then(({ data }) => setQuiz(data)).finally(() => setLoading(false))
  }, [id])

  async function handleStartSession() {
    const { data } = await startSession({ quiz_id: id })
    navigate(`/session/${data.id}`)
  }

  if (loading) return <LoadingState />
  if (!quiz) return <p className="text-center mt-20 text-gray-500">Quiz não encontrado.</p>

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Quiz gerado</h1>
      {quiz.summary && (
        <div className="bg-indigo-50 rounded-xl p-5 mb-6">
          <h2 className="font-semibold text-indigo-700 mb-2">Resumo do vídeo</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{quiz.summary}</p>
        </div>
      )}
      <p className="text-sm text-gray-500 mb-6">{quiz.flashcards.length} perguntas geradas</p>
      <button
        onClick={handleStartSession}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
      >
        Iniciar sessão de estudos
      </button>
    </div>
  )
}
