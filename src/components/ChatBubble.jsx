export default function ChatBubble({ message, isAgent }) {
  return (
    <div className={`flex ${isAgent ? 'justify-start' : 'justify-end'} mb-3`}>
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${
          isAgent
            ? 'bg-indigo-50 text-gray-800 rounded-tl-none'
            : 'bg-indigo-600 text-white rounded-tr-none'
        }`}
      >
        {message}
      </div>
    </div>
  )
}
