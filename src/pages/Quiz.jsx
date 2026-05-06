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

  if (!quiz)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Quiz não encontrado.</p>
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 px-4 py-12">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
            Quiz gerado 🎉
          </h1>
          <p className="text-gray-500 text-sm">
            Seu conteúdo está pronto para começar
          </p>
        </div>

        {/* Card principal */}
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-8 transition hover:shadow-xl">

          {/* Resumo */}
          {quiz.summary && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 mb-6">
              <h2 className="font-semibold text-indigo-700 mb-2">
                📌 Resumo do vídeo
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {quiz.summary}
              </p>
            </div>
          )}

          {/* Info */}
          <div className="flex items-center justify-between mb-6 text-sm">
            <span className="text-gray-500">
              Perguntas geradas
            </span>
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
              {quiz.flashcards.length}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 mb-6" />

          {/* Botão */}
          <button
            onClick={handleStartSession}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium
            hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-md hover:shadow-lg"
          >
            Iniciar sessão de estudos
          </button>
        </div>

        {/* Dica */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Dica: revise o resumo antes de começar para melhorar seu desempenho 🚀
        </p>

      </div>
    </div>
  )
}