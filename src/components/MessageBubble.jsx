import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function MessageBubble({ msg, userId }) {
  const isMe = msg.sender_id === userId;

  return (
    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} w-full`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-xl text-sm ${
          isMe ? 'bg-purple-300 text-black' : 'bg-green-300 text-black'
        }`}
      >
        {msg.contenu}
      </div>

      <div className="text-xs text-gray-500 mt-1 flex items-center space-x-1">
        <span>
          {format(new Date(msg.created_at), 'HH:mm', { locale: fr })}
        </span>

        {/* ✔ Vu uniquement pour mes messages */}
        {isMe && msg.vu && (
          <span className="text-blue-500 font-semibold ml-1">✔ Vu</span>
        )}
      </div>
    </div>
  );
}
