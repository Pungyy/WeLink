import { useParams } from 'react-router-dom';
import ChatBox from '../components/ChatBox';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function ChatPage() {
  const { id: targetId } = useParams();
  const [targetUser, setTargetUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase
        .from('utilisateurs')
        .select('*')
        .eq('id', targetId)
        .single();
      setTargetUser(data);
    };
    fetchUser();
  }, [targetId]);

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
