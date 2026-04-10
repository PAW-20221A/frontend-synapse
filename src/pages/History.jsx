import { useEffect, useState } from 'react'
import LoadingState from '../components/LoadingState.jsx'
import { listSessions } from '../services/api.js'

export default function History() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listSessions().then(({ data }) => setSessions(data)).finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingState />

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Histórico de sessões</h1>
      {sessions.length === 0 ? (
        <p className="text-gray-500 text-sm">Nenhuma sessão concluída ainda.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {sessions.map(session => (
            <div key={session.id} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{new Date(session.started_at).toLocaleDateString('pt-BR')}</p>
                {session.finished_at && (
                  <p className="font-medium text-gray-800">
                    {session.score} / {session.total} acertos
                  </p>
                )}
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${session.finished_at ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {session.finished_at ? 'Concluída' : 'Em andamento'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
