import { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import MessageBubble from './MessageBubble';

export default function ChatBox({ targetId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [user, setUser] = useState(null);
  const bottomRef = useRef(null);

  // Initialisation : charger user + messages + abonnement
  useEffect(() => {
    let channel;

    const init = async () => {
      const { data: authData } = await supabase.auth.getUser();
      const currentUser = authData?.user;
      if (!currentUser || !targetId) return;

      setUser(currentUser);

      // Charger les messages
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(
          `and(sender_id.eq.${currentUser.id},receiver_id.eq.${targetId}),and(sender_id.eq.${targetId},receiver_id.eq.${currentUser.id})`
        )
        .order('created_at', { ascending: true });

      if (error) {
        console.error("Erreur de chargement des messages:", error);
      } else {
        setMessages(data);
      }

      // Abonnement temps réel
      channel = supabase
        .channel('chat-realtime')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'messages' },
          (payload) => {
            console.log("🟢 Nouveau message reçu en temps réel:", payload);

            const msg = payload.new;

            const isForThisChat =
              (msg.sender_id === currentUser.id && msg.receiver_id === targetId) ||
              (msg.sender_id === targetId && msg.receiver_id === currentUser.id);

            if (isForThisChat) {
              setMessages((prev) => [...prev, msg]);
            }
          }
        )
        .subscribe();

      console.log("✅ Abonnement au canal chat-realtime actif");
    };

    init();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [targetId]);

  // Scroll vers le bas à chaque nouveau message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Envoi d’un message
  const sendMessage = async () => {
    if (!input.trim() || !user) return;

    const { error } = await supabase.from('messages').insert({
      sender_id: user.id,
      receiver_id: targetId,
      contenu: input,
    });

    if (error) {
      console.error("❌ Erreur lors de l'envoi du message:", error);
    }

    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto bg-gray-100 rounded p-4 mb-2">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} userId={user?.id} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex mt-auto">
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
