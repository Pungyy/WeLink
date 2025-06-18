import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import MessageBubble from './MessageBubble';

export default function ChatBox({ targetId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      loadMessages(data.user.id);
    });

    const channel = supabase
      .channel('chat-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          if (
            [payload.new.sender_id, payload.new.receiver_id].includes(user?.id)
          ) {
            setMessages((prev) => [...prev, payload.new]);
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [targetId]);

  const loadMessages = async (uid) => {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .or(
        `and(sender_id.eq.${uid},receiver_id.eq.${targetId}),and(sender_id.eq.${targetId},receiver_id.eq.${uid})`
      )
      .order('created_at', { ascending: true });

    setMessages(data);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    await supabase.from('messages').insert({
      sender_id: user.id,
      receiver_id: targetId,
      contenu: input,
    });

    setInput('');
  };

  return (
    <div>
      <div className="h-[400px] overflow-y-auto bg-gray-100 rounded p-4 mb-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} userId={user?.id} />
        ))}
      </div>

      <div className="flex">
        <input
          className="flex-1 p-2 border rounded-l"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Écrire un message..."
        />
        <button
          className="bg-purple-500 text-white px-4 rounded-r"
          onClick={sendMessage}
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
