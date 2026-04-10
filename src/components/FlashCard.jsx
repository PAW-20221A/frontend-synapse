export default function FlashCard({ flashcard, onAnswer, disabled }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <p className="text-lg font-medium text-gray-800 mb-4">{flashcard.question}</p>
      <div className="grid gap-2">
        {flashcard.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index)}
            disabled={disabled}
            className="text-left px-4 py-2 rounded-lg border border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="font-semibold mr-2">{String.fromCharCode(65 + index)})</span>
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
