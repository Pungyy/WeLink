import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function MessagesPage() {
  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndFriends = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const currentUser = userData.user;
      setUser(currentUser);

      const { data: amis, error: amisError } = await supabase
        .from('amis')
        .select('ami_id, utilisateurs!ami_id(id, prenom, photo_profil)')
        .eq('user_id', currentUser.id);

      if (amisError) return;

      // Pour chaque ami, on récupère le dernier message
      const friendsWithLastMsg = await Promise.all(
        amis.map(async (ami) => {
          const { data: lastMsg } = await supabase
            .from('messages')
            .select('created_at, sender_id')
            .or(
              `and(sender_id.eq.${currentUser.id},receiver_id.eq.${ami.ami_id}),and(sender_id.eq.${ami.ami_id},receiver_id.eq.${currentUser.id})`
            )
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          return {
            ...ami,
            lastMessageDate: lastMsg?.created_at || null,
            lastMessageSender: lastMsg?.sender_id || null,
          };
        })
      );

      setFriends(friendsWithLastMsg);
    };

    fetchUserAndFriends();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-purple-200 p-4 text-center font-bold text-lg">Messages</div>

      <div className="flex-1 overflow-y-auto divide-y">
        {friends.map((f) => {
          const isReceived = f.lastMessageSender && f.lastMessageSender !== user?.id;

          return (
            <button
              key={f.ami_id}
              onClick={() => navigate(`/chat/${f.ami_id}`)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-100"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={f.utilisateurs.photo_profil || '/default-avatar.png'}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="text-left">
                  <p className="font-semibold">{f.utilisateurs.prenom}</p>
                  <p className="text-sm text-gray-500">
                    {f.lastMessageDate
                      ? `${isReceived ? 'Reçu' : 'Envoyé'} ${formatDistanceToNow(new Date(f.lastMessageDate), {
                          addSuffix: true,
                          locale: fr,
                        })}`
                      : 'Aucun message'}
                  </p>
                </div>
              </div>

              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
