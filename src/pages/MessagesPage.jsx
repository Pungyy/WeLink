// ✅ Nouveau MessagesPage.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function MessagesPage() {
  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndFriends = async () => {
      const { data: userData } = await supabase.auth.getUser();
      setUser(userData.user);

      const { data, error } = await supabase
        .from('amis')
        .select('ami_id, utilisateurs!ami_id(id, prenom, photo_profil)')
        .eq('user_id', userData.user.id);

      if (!error) setFriends(data);
    };

    fetchUserAndFriends();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-purple-200 p-4 text-center font-bold text-lg">Messages</div>

      <div className="flex-1 overflow-y-auto divide-y">
        {friends.map((f) => (
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
                <p className="text-sm text-gray-500">Envoyé il y a 4 h</p>
              </div>
            </div>

            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </button>
        ))}
      </div>
    </div>
  );
}
