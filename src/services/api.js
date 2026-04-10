import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('synapse_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth
export const register = (data) => api.post('/api/auth/register', data)
export const login = (data) => api.post('/api/auth/login', data)
export const getMe = () => api.get('/api/auth/me')

// Quiz
export const generateQuiz = (data) => api.post('/api/quiz/generate', data)
export const getQuiz = (id) => api.get(`/api/quiz/${id}`)
export const listQuizzes = () => api.get('/api/quiz/')

// Sessions
export const startSession = (data) => api.post('/api/sessions', data)
export const submitAnswer = (sessionId, data) => api.post(`/api/sessions/${sessionId}/answer`, data)
export const getSession = (id) => api.get(`/api/sessions/${id}`)
export const finishSession = (id) => api.post(`/api/sessions/${id}/finish`)
export const listSessions = () => api.get('/api/sessions/')

export default api
