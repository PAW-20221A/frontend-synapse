export default function LoadingState({ message = 'Carregando...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-500">
      <div className="w-10 h-10 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin" />
      <p className="text-sm">{message}</p>
    </div>
  )
}
