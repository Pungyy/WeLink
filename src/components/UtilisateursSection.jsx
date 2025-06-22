import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const UtilisateursSection = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUtilisateurs = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError("Utilisateur non connecté.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("utilisateurs")
        .select("id, prenom, photo_profil, description")
        .limit(50)
        .order("prenom", { ascending: true });

      if (error) {
        setError(error.message);
      } else {
        // Exclure l'utilisateur connecté
        const autres = data.filter((u) => u.id !== user.id);
        setUtilisateurs(autres);
      }

      setLoading(false);
    };

    fetchUtilisateurs();
  }, []);


  if (loading) return (
    <div className="flex justify-center items-center py-10">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (error) return <p className="text-red-600 py-10 text-center">Erreur : {error}</p>;

  if (utilisateurs.length === 0) return (
    <p className="text-gray-500 py-10 text-center">Aucun utilisateur trouvé.</p>
  );

  return (
    <section className="px-6 py-10 max-w-7xl mx-auto">
      <h2 className="text-4xl font-semibold mb-8 text-center">Nos Utilisateurs</h2>
      <div className="flex gap-8 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200 px-2 py-4">
        {utilisateurs.map((user) => (
          <div
            key={user.id}
            onClick={() => navigate(`/user/${user.id}`)}
            className="flex flex-col items-center min-w-[100px] max-w-[140px] bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            title={user.description || ""}
          >
            <img
              src={user.photo_profil || "/default-avatar.png"}
              alt={`Photo de ${user.prenom}`}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-3"
              loading="lazy"
            />
            <p className="text-lg font-semibold text-center truncate w-full">{user.prenom}</p>
            {user.description && (
              <p className="text-sm text-gray-500 mt-1 text-center line-clamp-2">{user.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default UtilisateursSection;
