export default function MessageBubble({ msg, userId }) {
  const isMe = msg.sender_id === userId;

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`px-4 py-2 rounded-lg max-w-[70%] break-words whitespace-pre-wrap ${
          isMe ? 'bg-purple-500 text-white' : 'bg-gray-300 text-black'
        }`}
      >
        {msg.contenu}
      </div>
    </div>
  );
}
