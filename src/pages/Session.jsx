import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ChatBubble from '../components/ChatBubble.jsx'
import FlashCard from '../components/FlashCard.jsx'
import LoadingState from '../components/LoadingState.jsx'
import { finishSession, getQuiz, getSession, submitAnswer } from '../services/api.js'

export default function Session() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [session, setSession] = useState(null)
  const [quiz, setQuiz] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [messages, setMessages] = useState([])
  const [answering, setAnswering] = useState(false)
  const [loading, setLoading] = useState(true)
  const bottomRef = useRef(null)

  useEffect(() => {
    async function load() {
      const { data: sessionData } = await getSession(id)
      setSession(sessionData)
      const { data: quizData } = await getQuiz(sessionData.quiz_id)
      setQuiz(quizData)
      setMessages([{ text: 'Olá! Vamos começar o quiz. Responda as perguntas abaixo.', isAgent: true }])
      setLoading(false)
    }
    load()
  }, [id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleAnswer(answerIndex) {
    const flashcard = quiz.flashcards[currentIndex]
    setAnswering(true)
    setMessages(prev => [...prev, { text: `Minha resposta: ${flashcard.options[answerIndex]}`, isAgent: false }])

    try {
      const { data } = await submitAnswer(id, { flashcard_id: flashcard.id, answer_given: answerIndex })
      setMessages(prev => [...prev, { text: data.feedback, isAgent: true }])

      if (currentIndex + 1 < quiz.flashcards.length) {
        setCurrentIndex(i => i + 1)
      } else {
        const { data: finalSession } = await finishSession(id)
        setSession(finalSession)
        setMessages(prev => [...prev, {
          text: `Parabéns! Você concluiu o quiz com ${finalSession.score} de ${finalSession.total} acertos.`,
          isAgent: true,
        }])
        setCurrentIndex(-1)
      }
    } finally {
      setAnswering(false)
    }
  }

  if (loading) return <LoadingState />

  const currentCard = currentIndex >= 0 ? quiz?.flashcards[currentIndex] : null

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4 flex flex-col gap-4">
      <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 min-h-[300px] max-h-[400px] overflow-y-auto">
        {messages.map((msg, i) => <ChatBubble key={i} message={msg.text} isAgent={msg.isAgent} />)}
        <div ref={bottomRef} />
      </div>

      {currentCard ? (
        <FlashCard flashcard={currentCard} onAnswer={handleAnswer} disabled={answering} />
      ) : (
        <button
          onClick={() => navigate('/')}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
        >
          Voltar ao início
        </button>
      )}
    </div>
  )
}
