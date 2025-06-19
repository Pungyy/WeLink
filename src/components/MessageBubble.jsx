export default function MessageBubble({ msg, userId }) {
  const isMe = msg.sender_id === userId;

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} w-full`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-xl text-sm ${
          isMe ? 'bg-purple-300 text-right text-black' : 'bg-green-300 text-left text-black'
        }`}
      >
        {msg.contenu}
      </div>
    </div>
  );
}
