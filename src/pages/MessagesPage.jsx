import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import ChatBox from '../components/ChatBox';

export default function MessagesPage() {
  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState(null);
  const [targetUser, setTargetUser] = useState(null);

  const [selectedUserId, setSelectedUserId] = useState(null);

  // Pour savoir si on est en version mobile
  const isMobile = window.innerWidth < 768;


  const navigate = useNavigate();
  const { id: targetId } = useParams();

  // Récupère l'utilisateur connecté
  useEffect(() => {
    const fetchUserAndFriends = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const currentUser = userData.user;
      setUser(currentUser);

      const { data: amis } = await supabase
        .from('amis')
        .select('ami_id, utilisateurs!ami_id(id, prenom, photo_profil)')
        .eq('user_id', currentUser.id);

      const friendsWithLastMsg = await Promise.all(
        amis.map(async (ami) => {
          const { data: lastMsg } = await supabase
            .from('messages')
            .select('created_at, sender_id, receiver_id, vu')
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
            lastMessageVu: lastMsg?.vu,
            lastMessageReceiver: lastMsg?.receiver_id,
          };
        })
      );

      friendsWithLastMsg.sort((a, b) =>
        new Date(b.lastMessageDate || 0) - new Date(a.lastMessageDate || 0)
      );

      setFriends(friendsWithLastMsg);
    };

    fetchUserAndFriends();
  }, []);

  // Charger l'utilisateur cible
  useEffect(() => {
    const fetchTarget = async () => {
      if (!targetId) return;
      const { data } = await supabase
        .from('utilisateurs')
        .select('*')
        .eq('id', targetId)
        .single();
      setTargetUser(data);
    };
    fetchTarget();
  }, [targetId]);

  // Marquer les messages reçus comme lus
  useEffect(() => {
    const markMessagesAsRead = async () => {
      if (!user || !targetId) return;
      await supabase
        .from('messages')
        .update({ vu: true })
        .eq('receiver_id', user.id)
        .eq('sender_id', targetId)
        .eq('vu', false);
    };
    markMessagesAsRead();
  }, [user, targetId]);

  return (
    <div className="flex h-screen">
      {/* Sidebar gauche */}
      <div className="w-full md:w-1/3 lg:w-1/4 border-r h-full flex flex-col">
        <div className="bg-purple-200 p-4 text-center font-bold text-lg">Messages</div>
        <div className="flex-1 overflow-y-auto divide-y">
          {friends.map((f) => {
            const isReceived = f.lastMessageSender && f.lastMessageSender !== user?.id;
            const isUnread = isReceived && f.lastMessageVu === false && f.lastMessageReceiver === user?.id;

            return (
              <button
                key={f.ami_id}
                onClick={() => {
                  if (isMobile) {
                    navigate(`/chat/${f.ami_id}`);
                  } else {
                    setSelectedUserId(f.ami_id);
                    navigate('/messages'); // reste sur la page principale
                  }
                }}
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
                {isUnread && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Zone de chat droite */}
      {/* Desktop */}
      <div className="hidden md:flex flex-col flex-1 h-full">
        {(targetId || selectedUserId) ? (
          <>
            <div className="flex items-center gap-3 bg-purple-200 p-4 shadow">
              {/* Affichage avatar & prénom */}
              <img
                src={
                  friends.find(f => f.ami_id === (targetId || selectedUserId))?.utilisateurs.photo_profil
                  || '/default-avatar.png'
                }
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
              <span className="font-semibold text-lg">
                {
                  friends.find(f => f.ami_id === (targetId || selectedUserId))?.utilisateurs.prenom
                  || 'Chargement...'
                }
              </span>
            </div>
            <div className="flex-1 overflow-hidden">
              <ChatBox targetId={targetId || selectedUserId} />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Sélectionnez une conversation
          </div>
        )}
      </div>

    </div>
  );
}
