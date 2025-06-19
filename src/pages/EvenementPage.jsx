import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function EvenementPage() {
  const { id } = useParams();
  const [evenement, setEvenement] = useState(null);

  useEffect(() => {
    const fetchEvenement = async () => {
      const { data, error } = await supabase
        .from('evenements')
        .select('*')
        .eq('id', id)
        .single();

      if (!error) {
        setEvenement(data);
      }
    };

    fetchEvenement();
  }, [id]);

  const handleInscription = async () => {
    const user = await supabase.auth.getUser();
    const userId = user.data.user.id;

    const { error } = await supabase.from('evenements_participants').insert([
      { evenement_id: id, user_id: userId }
    ]);

    if (!error) alert('Inscription réussie !');
  };

  if (!evenement) return <p className="text-center">Chargement...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{evenement.titre}</h1>
      <p className="text-gray-500 mb-2">{evenement.date}</p>
      <p className="mb-4">{evenement.description}</p>
      {evenement.image && (
        <img src={evenement.image} alt={evenement.titre} className="rounded-lg mb-4" />
      )}
      <button
        onClick={handleInscription}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        S'inscrire à l'événement
      </button>
    </div>
  );
}
