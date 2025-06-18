import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AddFriendButton() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleAddFriend = async () => {
    const currentUser = (await supabase.auth.getUser()).data.user;

    const { data: targetUser } = await supabase
      .from('utilisateurs')
      .select('id')
      .eq('email', email)
      .single();

    if (!targetUser) {
      setMessage('Utilisateur introuvable');
      return;
    }

    await supabase.from('amis').insert([
      { user_id: currentUser.id, ami_id: targetUser.id },
      { user_id: targetUser.id, ami_id: currentUser.id }, // pour relation bidirectionnelle
    ]);

    setMessage('Ami ajouté !');
  };

  return (
    <div className="mt-6">
      <input
        type="email"
        placeholder="Email de l’ami"
        className="border p-2 rounded mr-2"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleAddFriend} className="bg-purple-500 text-white px-4 py-2 rounded">
        Ajouter
      </button>
      <p className="mt-2 text-sm text-gray-600">{message}</p>
    </div>
  );
}
