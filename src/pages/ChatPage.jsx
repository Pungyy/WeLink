import { useParams } from 'react-router-dom';
import ChatBox from '../components/ChatBox';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function ChatPage() {
  const { id: targetId } = useParams();
  const [targetUser, setTargetUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Récupérer l'utilisateur connecté
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data } = await supabase.auth.getUser();
      setCurrentUser(data.user);
    };
    getCurrentUser();
  }, []);

  // Charger les infos du targetUser
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase
        .from('utilisateurs')
        .select('*')
        .eq('id', targetId)
        .single();
      setTargetUser(data);
    };
    if (targetId) fetchUser();
  }, [targetId]);

  // Marquer les messages reçus non lus comme lus dès que la page/chat s'ouvre
  useEffect(() => {
    const markMessagesAsRead = async () => {
      if (!currentUser || !targetId) return;

      await supabase
        .from('messages')
        .update({ vu: true })
        .eq('receiver_id', currentUser.id)
        .eq('sender_id', targetId)
        .eq('vu', false);
    };

    markMessagesAsRead();
  }, [currentUser, targetId]);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex items-center gap-3 bg-purple-200 p-4 shadow">
        {targetUser?.photo_profil && (
          <img
            src={targetUser.photo_profil}
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
        )}
        <span className="font-semibold text-lg">
          {targetUser?.prenom || 'Chargement...'}
        </span>
      </div>
      <div className="flex-1 overflow-hidden">
        <ChatBox targetId={targetId} />
      </div>
    </div>
  );
}
