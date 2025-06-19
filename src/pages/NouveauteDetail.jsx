import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function NouveauteDetail() {
  const { id } = useParams();
  const [nouveaute, setNouveaute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInscribed, setIsInscribed] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const currentUserId = userData?.user?.id;
      setUserId(currentUserId);

      // Récupérer la nouveauté
      const { data, error } = await supabase
        .from('nouveautes')
        .select(`
          *,
          utilisateurs:createur_id (
            id,
            prenom,
            photo_profil
          )
        `)
        .eq('id', id)
        .single();

      if (error) console.error(error);
      else setNouveaute(data);

      // Vérifier si l'utilisateur est déjà inscrit
      if (currentUserId) {
        const { data: existing } = await supabase
          .from('nouveautes_participants')
          .select('*')
          .eq('nouveaute_id', id)
          .eq('user_id', currentUserId)
          .single();

        if (existing) setIsInscribed(true);
      }

      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleInscription = async () => {
    if (!userId) {
      alert("Veuillez vous connecter pour vous inscrire.");
      return;
    }

    const { error } = await supabase.from('nouveautes_participants').insert([
      {
        nouveaute_id: id,
        user_id: userId,
      },
    ]);

    if (!error) {
      alert('Inscription réussie !');
      setIsInscribed(true);
    } else {
      alert("Erreur lors de l'inscription.");
      console.error(error);
    }
  };

  if (loading) return <div className="text-center py-12 text-gray-600">Chargement...</div>;
  if (!nouveaute) return <div className="text-center py-12 text-red-500">Nouveauté introuvable.</div>;

  return (
    <div className="flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl overflow-hidden">
        {nouveaute.image && (
          <img
            src={nouveaute.image}
            alt={nouveaute.titre}
            className="w-full h-64 object-cover"
          />
        )}

        <div className="p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-purple-700">{nouveaute.titre}</h1>
          <p className="text-gray-700 mb-6">{nouveaute.description || 'Pas de description.'}</p>

          <div className="flex items-center gap-3 mb-8">
            <img
              src={nouveaute.utilisateurs?.photo_profil || '/default-avatar.png'}
              className="w-10 h-10 rounded-full object-cover"
              alt="Créateur"
            />
            <span className="text-sm text-gray-600">
              Créé par <strong>{nouveaute.utilisateurs?.prenom || 'Inconnu'}</strong>
            </span>
          </div>

          {!isInscribed ? (
            <button
              onClick={handleInscription}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition duration-300 shadow-md w-full sm:w-auto"
            >
              M'inscrire à cette nouveauté
            </button>
          ) : (
            <p className="text-green-600 font-medium">✅ Vous êtes déjà inscrit.</p>
          )}
        </div>
      </div>
    </div>
  );
}
