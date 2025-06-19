import { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import MessageBubble from './MessageBubble';

export default function ChatBox({ targetId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [user, setUser] = useState(null);
  const bottomRef = useRef(null);
  const scrollContainerRef = useRef(null); // REF pour zone scrollable

  useEffect(() => {
    let channel;

    const init = async () => {
      const { data: authData } = await supabase.auth.getUser();
      const currentUser = authData?.user;
      if (!currentUser || !targetId) return;

      setUser(currentUser);

      const { data } = await supabase
        .from('messages')
        .select('*')
        .or(
          `and(sender_id.eq.${currentUser.id},receiver_id.eq.${targetId}),and(sender_id.eq.${targetId},receiver_id.eq.${currentUser.id})`
        )
        .order('created_at', { ascending: true });

      setMessages(data);

      // Abonnement temps réel : INSERT + UPDATE
      channel = supabase
        .channel('chat-realtime')
        .on(
          'postgres_changes', 
          { event: 'INSERT', schema: 'public', table: 'messages' }, 
          (payload) => {
            const msg = payload.new;
            const isForThisChat =
              (msg.sender_id === currentUser.id && msg.receiver_id === targetId) ||
              (msg.sender_id === targetId && msg.receiver_id === currentUser.id);

            if (isForThisChat) {
              setMessages((prev) => [...prev, msg]);
            }
          }
        )
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'messages' },
          (payload) => {
            const updatedMsg = payload.new;
            const isForThisChat =
              (updatedMsg.sender_id === currentUser.id && updatedMsg.receiver_id === targetId) ||
              (updatedMsg.sender_id === targetId && updatedMsg.receiver_id === currentUser.id);

            if (isForThisChat) {
              // Met à jour le message dans la liste
              setMessages((prev) =>
                prev.map((msg) => (msg.id === updatedMsg.id ? updatedMsg : msg))
              );
            }
          }
        )
        .subscribe();
    };

    init();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
}, [targetId]);


  // ✅ Scroll uniquement dans la zone des messages
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !user) return;

    const { error } = await supabase.from('messages').insert({
      sender_id: user.id,
      receiver_id: targetId,
      contenu: input,
    });

    if (!error) setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Zone de messages */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-2 bg-white"
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} userId={user?.id} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Barre d'envoi */}
      <div className="border-t px-4 py-2 bg-white flex items-center gap-2">
        <input
          className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Écrire message..."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          onClick={sendMessage}
          className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2.94 2.94a.75.75 0 01.82-.17l13 5.5a.75.75 0 010 1.36l-13 5.5a.75.75 0 01-1.04-.9l1.3-4.33a.75.75 0 010-.48l-1.3-4.33a.75.75 0 01.22-.85z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
