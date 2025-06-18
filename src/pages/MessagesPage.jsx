import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import AddFriendButton from '../components/AddFriendButton';

export default function MessagesPage() {
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();
  const user = supabase.auth.getUser(); // ou ta méthode personnalisée

  useEffect(() => {
    const fetchFriends = async () => {
      const { data, error } = await supabase
        .from('amis')
        .select('ami_id, utilisateurs!ami_id(*)')
        .eq('user_id', user.id);

      if (!error) setFriends(data);
    };

    fetchFriends();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Mes amis</h1>
      <ul>
        {friends.map(f => (
          <li key={f.ami_id} className="mb-2">
            <button
              onClick={() => navigate(`/chat/${f.ami_id}`)}
              className="text-purple-500 underline"
            >
              {f.utilisateurs.prenom} {f.utilisateurs.nom}
            </button>
          </li>
        ))}
      </ul>
      <AddFriendButton />
    </div>
  );
}
